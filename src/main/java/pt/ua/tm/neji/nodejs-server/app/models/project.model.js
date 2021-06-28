// This Sequelize Model represents a Project table in PostgreSQL database. 
// These columns will be generated automatically: proj_id, proj_name, manager, n_documents, n_members, status, createdAt, updatedAt.

module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("projects", {
        proj_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        proj_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        manager: {
            type: Sequelize.STRING,
            allowNull: false
        },
        n_documents: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        n_members: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: "Open"
        },
    });

    return Project;
};