require('dotenv').config();

const express = require('express');
const boxen = require('boxen');
const chalk = require('chalk');
const figlet = require('figlet');
const fileUpload = require('express-fileupload');

const logger = require('./app/config/logger');
const sequelize = require('./app/config/database');
const routes = require('./app/config/routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 }, abortOnLimit: true, createParentPath: true }));

routes(app);

app.listen(PORT, () => {
    logger.info(`✔ Server running on http://localhost:${PORT}.`);
    console.log(
        boxen(
            chalk.green.bold(figlet.textSync('Server running', { horizontalLayout: 'full' })) +
                `\n${`✔ Server running on  http://localhost:${PORT}.`}`,
            {
                padding: 1,
                margin: 1,
                borderColor: 'green',
                borderStyle: 'round'
            }
        )
    );

    sequelize
        .authenticate()
        .then(() => {
            logger.info('✔ Database Connected.');
        })
        .catch((err) => {
            logger.error(`✖ Database Connection Failed. ${JSON.stringify(err)}`);
            console.log(
                boxen(chalk.red(figlet.textSync('DB ERROR', { horizontalLayout: 'full' })) + `\n${err.message}`, {
                    padding: 1,
                    margin: 1,
                    borderColor: 'red',
                    borderStyle: 'round'
                })
            );
        });
});
