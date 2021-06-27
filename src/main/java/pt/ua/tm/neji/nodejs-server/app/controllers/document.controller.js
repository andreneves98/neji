const db = require("../models");
const Document = db.documents;
const Op = db.Sequelize.Op;

// Create a new document: [POST] api/documents
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a document
    const document = {
        title: req.body.title,
    }

    // Save document in the database
    Document.create(document)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the document."
            });
        });
};

// Retrieve all documents from the database: [GET] api/documents
exports.findAll = (req, res) => {
    const title = req.query.title;
    // if we want to find all documents with a given name
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Document.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving documents."
        });
    });
};

// Find a single document with a doc_id: [GET] api/documents/:doc_id
exports.findOne = (req, res) => {
    const doc_id = req.params.doc_id;

    Document.findByPk(doc_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Document with doc_id=" + doc_id
            });
        });
};

// Update a document by the id in the request: [PUT] api/documents/:doc_id
exports.updateByID = (req, res) => {
    const doc_id = req.params.doc_id;

    Document.update(req.body, {
        where: { doc_id: doc_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Document was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Document with doc_id=${doc_id}. Maybe Document was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Document with doc_id=" + doc_id
            });
        });
};

// Update a document by the title in the request: [PUT] api/documents?title=title
exports.updateByTitle = (req, res) => {
    const title = req.query.title;

    Document.update(req.body, {
        where: { title: title }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Document was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Document with title=${title}. Maybe Document was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Document with title=" + title
            });
        });
};

// Delete a Document with the specified id in the request: [DELETE] api/documents/:doc_id
exports.deleteByID = (req, res) => {
    const doc_id = req.params.doc_id;

    Document.destroy({
        where: { doc_id: doc_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Document was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Document with doc_id=${doc_id}. Maybe Document was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Document with doc_id=" + doc_id
            });
        });
};

// Delete all Documents from the database: [DELETE] api/documents
exports.deleteAll = (req, res) => {
    Document.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Documents were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Documents."
            });
        });
};
