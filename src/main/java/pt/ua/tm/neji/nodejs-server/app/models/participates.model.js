// This Sequelize Model represents a Participates table in PostgreSQL database. 
// These columns will be generated automatically: proj_id, member_id, createdAt, updatedAt.

module.exports = (sequelize, Sequelize) => {
    const Participates = sequelize.define("participates", {
        // foreign key from Project
        proj_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'projects',
                key: 'proj_id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        // foreign key from Member
        member_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            references: {
                model: 'members',
                key: 'member_id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            onDelete: 'CASCADE',
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Participates;
};