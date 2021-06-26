// This Sequelize Model represents a Member table in PostgreSQL database. 
// These columns will be generated automatically: member_id, first_name, last_name, createdAt, updatedAt.

module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("members", {
        member_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Member;
};