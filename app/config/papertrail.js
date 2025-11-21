const PaperTrailInit = require('sequelize-paper-trail').init;

module.exports = (sequelize) => {
    const paperTrail = PaperTrailInit(sequelize, {
        debug: true,
        log: console.log,
        underscored: true,
        enableRevisionChangeModel: false,
        tableName: 'revisions',
        revisionAttribute: 'revision',
        useJsonDataType: true,
        enableStrictDiff: true
    });

    paperTrail.defineModels();

    return paperTrail;
};
