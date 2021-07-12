// This Sequelize Model represents a Project table in PostgreSQL database. 
// These columns will be generated automatically: proj_id, proj_name, manager, status, description, createdAt, updatedAt.

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
        // foreign key from Members
        manager: {
            type: Sequelize.STRING,
            references: {
                model: 'members',
                key: 'username',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            onDelete: 'SET NULL',
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: "Open"
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "No description provided."
        }
    });

    return Project;
};