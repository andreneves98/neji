const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.annotations = require("./annotation.model.js")(sequelize, Sequelize);
db.documents = require("./document.model.js")(sequelize, Sequelize);
db.members = require("./member.model.js")(sequelize, Sequelize);
db.participates = require("./participates.model.js")(sequelize, Sequelize);
db.projects = require("./project.model.js")(sequelize, Sequelize);

module.exports = db;