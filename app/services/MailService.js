class MailService {
    envelope() {
        return {
            subject: '',
            to: '',
            from: process.env.MAIL_FROM_ADDRESS
        };
    }

    content() {
        return {
            view: '',
            data: {}
        };
    }

    attachments() {
        return [];
    }
}

module.exports = MailService;
