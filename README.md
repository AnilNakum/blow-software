# BlowSoftware

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.5.

## Database
Create DB Name : `blow-software` in phpmyadmin

## Code
Open Project Folder in Terminal
Run `npm install` for Angular Package installation.

Now Open api folder in Terminal
Run `npm install` for Node Package installation.

## Run Node Code By
`npm start` API Runs on `http://localhost:3000/`

After Run Add defualt user by run following query in phpmyadmin

## Role: admin
INSERT INTO `auths` (`id`, `name`, `email`, `password`, `status`, `role`, `createdAt`, `updatedAt`) VALUES (1, 'Admin', 'johndoe@example.com', '$2a$10$/fEe4I0zab/p9O/EVTQY2.tU8rHMqEZSSAa9Ox2arjXzlTG6.6niu', '1', 'admin', '2023-06-27 00:00:00.000000', '2023-06-27 00:00:00.000000');
## Role: regular
INSERT INTO `auths` (`id`, `name`, `email`, `password`, `status`, `role`, `createdAt`, `updatedAt`) VALUES (2, 'Regular User', 'janedoe@example.com', '$2a$10$NBwNCE97YZDdIFZtRajNruMt1SYiH0O6qmUba26PwOowdDXF7yTry', '1', 'regular', '2023-06-27 00:00:00.000000', '2023-06-27 00:00:00.000000');

## Angular Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

Now Login With username & Password.
User 1: Role: admin, username - johndoe@example.com, password: test1
User 2: Role: regular, username - janedoe@example.com, password: test2
