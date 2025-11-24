const MailService = require('../services/MailService');

class WelcomeMail extends MailService {
    constructor(user) {
        super();
        this.user = user;
    }

    envelope() {
        return {
            subject: 'Welcome to our App',
            to: this.user
        };
    }

    content() {
        return {
            view: 'welcome.ejs',
            data: {
                name: this.user
            }
        };
    }

    attachments() {
        return [];
    }
}

module.exports = WelcomeMail;
