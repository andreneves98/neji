// This Sequelize Model represents a Annotation table in PostgreSQL database. 
// These columns will be generated automatically: concept_id, term, score, offset, type, color, createdAt, updatedAt.

module.exports = (sequelize, Sequelize) => {
    const Annotation = sequelize.define("annotations", {
        concept_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        term: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        score: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        offset: {
            type: Sequelize.STRING,
            allowNull: true
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        color: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        // foreign key from Document
        doc_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'documents',
                key: 'doc_id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            onDelete: 'CASCADE',
        },
    });

    return Annotation;
};