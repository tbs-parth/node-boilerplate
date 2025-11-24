const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

class Mail {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            },
            secure: process.env.MAIL_ENCRYPTION === 'ssl'
        });
    }

    async send(mailable) {
        const envelope = mailable.envelope();
        const content = mailable.content();
        const attachments = mailable.attachments();
        // Logic to send email using envelope, content, and attachments
        const templatePath = path.join(__dirname, '..', 'views', 'emails', content.view);

        const html = await ejs.renderFile(templatePath, content.data);

        return this.transporter.sendMail({
            from: envelope.from || {
                address: process.env.MAIL_FROM_ADDRESS,
                name: process.env.MAIL_FROM_NAME.replace('${APP_NAME}', process.env.APP_NAME)
            },
            to: envelope.to,
            subject: envelope.subject,
            html,
            attachments
        });
    }
}

module.exports = new Mail();
