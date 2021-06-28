// This Sequelize Model represents a Document table in PostgreSQL database. 
// These columns will be generated automatically: doc_id, title, n_annotations, proj_id, createdAt, updatedAt.

module.exports = (sequelize, Sequelize) => {
    const Document = sequelize.define("documents", {
        doc_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        n_annotations: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        // foreign key from Project
        proj_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'projects',
                key: 'proj_id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            onDelete: 'CASCADE',
        }
    });

    return Document;
};