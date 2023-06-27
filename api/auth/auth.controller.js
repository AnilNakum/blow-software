const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize')
const authService = require('./auth.service');

// routes
router.post('/login', authenticateSchema, authenticate);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/add', addSchema, add);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    authService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function addSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function add(req, res, next) {
    authService.create(req.body)
        .then(() => res.json({ message: 'Added Successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    authService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    authService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}


