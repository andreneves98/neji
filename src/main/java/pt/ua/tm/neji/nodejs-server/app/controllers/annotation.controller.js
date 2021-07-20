const db = require("../models");
const Annotation = db.annotations;
const Op = db.Sequelize.Op;

// Create a new annotation: [POST] api/annotations
exports.create = (req, res) => {
    // Validate request
    if (!req.body.concept_id && !req.body.term && !req.body.score && !req.body.type && !req.body.color && !req.body.doc_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create an annotation
    const annotation = {
        concept_id: req.body.concept_id,
        term: req.body.term,
        score: req.body.score,
        type: req.body.type,
        color: req.body.color,
        doc_id: req.body.doc_id
    }

    // Save annotation in the database
    Annotation.create(annotation)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the annotation."
            });
        });
};

// Retrieve all annotations from the database belonging to a document: [GET] api/annotations?doc_id=doc_id
exports.findAll = (req, res) => {
    const doc_id = req.query.doc_id;
    var condition = doc_id ? { doc_id: { [Op.iLike]: `%${doc_id}%` } } : null;

    Annotation.findAll({ where: { condition } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving annotations."
        });
    });
};

// Find a single annotation with a concept_id: [GET] api/annotations/:concept_id
exports.findOne = (req, res) => {
    const concept_id = req.params.concept_id;

    Annotation.findByPk(concept_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Annotation with concept_id=" + concept_id
            });
        });
};

// Update a annotation by the id in the request: [PUT] api/annotations/:concept_id
exports.updateByID = (req, res) => {
    const concept_id = req.params.concept_id;

    Annotation.update(req.body, {
        where: { concept_id: concept_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Annotation was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Annotation with concept_id=${concept_id}. Maybe Annotation was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Annotation with concept_id=" + concept_id
            });
        });
};

// Delete a Annotation with the specified concept_id in the request: [DELETE] api/annotations/:concept_id
exports.deleteByID = (req, res) => {
    const concept_id = req.params.concept_id;

    Annotation.destroy({
        where: { concept_id: concept_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Annotation was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Annotation with concept_id=${concept_id}. Maybe Annotation was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Annotation with concept_id=" + concept_id
            });
        });
};

// Delete all Annotations from the database: [DELETE] api/Annotations
exports.deleteAll = (req, res) => {
    Annotation.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Annotations were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Annotations."
            });
        });
};
