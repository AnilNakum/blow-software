const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

module.exports = {
    authenticate,
    getById,
    getAll,
    create,
    delete: _delete,
};

async function authenticate({ username, password }) {
    console.log(username);
    console.log(password);
    var email = username;
    var user = await db.Auth.scope('withHash').findOne({ where: { email } });
    console.log(user);
    if (!user) {
        user = await db.Auth.scope('withHash').findOne({ where: { email: email } });
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw 'Username or password is incorrect';
    }

    if (user.status != 1) {
        throw 'Account not activated.';
    }

    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    const User = user.get();

    return await { ...omitHash(User), token };
}

async function getAll() {
    return await db.Auth.findAll();
}


async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.Auth.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.Auth.create(params);
}



async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.Auth.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}