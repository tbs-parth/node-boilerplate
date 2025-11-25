const { promisify } = require('util');
class BaseController {
    async testFileUpload(req, res) {
        try {
            if (!req.files || !req.files.file) {
                return res.status(400).json({ message: 'No file uploaded.' });
            }

            const file = req.files.file;
            const mv = promisify(file.mv.bind(file)); // convert to Promise
            await mv(`./uploads/${file.name}`);

            return res.status(200).json({
                message: 'File uploaded successfully',
                file: file.name
            });
        } catch (err) {
            console.error('Upload error:', err);
            return res.status(500).json({ message: 'Internal server error', error: err.message });
        }
    }
}

module.exports = new BaseController();
