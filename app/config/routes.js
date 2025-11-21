const apiRoutes = require('../routes/api.routes');
module.exports = (app) => {
    // Web routes (like Laravel web.php)
    // app.use('/', webRoutes);

    // API routes (like Laravel api.php)
    app.use('/api', apiRoutes);
};
