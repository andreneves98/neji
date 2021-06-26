// This Sequelize Model represents tutorials table in PostgreSQL database. 
// These columns will be generated automatically: id, title, description, published, createdAt, updatedAt.

module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorials", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Tutorial;
};