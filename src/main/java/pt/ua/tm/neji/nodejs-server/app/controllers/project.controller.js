const db = require("../models");
const Project = db.projects;
const Op = db.Sequelize.Op;

// Create a new project: [POST] api/projects
exports.create = (req, res) => {
    // Validate request
    if (!req.body.proj_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a project
    const project = {
        proj_name: req.body.proj_name,
        manager: req.body.manager
    }

    // Save project in the database
    Project.create(project)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the project."
            });
        });
};

// Retrieve all projects from the database: [GET] api/projects
exports.findAll = (req, res) => {
    const proj_name = req.query.proj_name;
    // if we want to find all projects with a given name
    var condition = proj_name ? { proj_name: { [Op.iLike]: `%${proj_name}%` } } : null;

    Project.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving projects."
        });
    });
};

// Find a single project with a name: [GET] api/projects/:name
exports.findOne = (req, res) => {
    const proj_id = req.params.proj_id;

    Project.findByPk(proj_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Project with proj_id=" + proj_id
            });
        });
};

// Update a project by the id in the request: [PUT] api/projects/:proj_id
exports.updateByID = (req, res) => {
    const proj_id = req.params.proj_id;

    Project.update(req.body, {
        where: { proj_id: proj_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Project was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Project with proj_id=${proj_id}. Maybe Project was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Project with proj_id=" + proj_id
            });
        });
};

// Update a project by the name in the request: [PUT] api/projects?proj_name=name
exports.updateByName = (req, res) => {
    const proj_name = req.query.proj_name;

    Project.update(req.body, {
        where: { proj_name: proj_name }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Project was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Project with proj_name=${proj_name}. Maybe Project was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Project with proj_name=" + proj_name
            });
        });
};

// Delete a Project with the specified id in the request: [DELETE] api/projects/:proj_id
exports.deleteByID = (req, res) => {
    const proj_id = req.params.proj_id;

    Project.destroy({
        where: { proj_id: proj_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Project was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Project with proj_id=${proj_id}. Maybe Project was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Project with proj_id=" + proj_id
            });
        });
};

// Delete a project by the name in the request: [PUT] api/projects?proj_name=name
exports.deleteByName = (req, res) => {
    const proj_name = req.query.proj_name;

    Project.destroy(req.body, {
        where: { proj_name: proj_name }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Project was deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot delete Project with proj_name=${proj_name}. Maybe Project was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting Project with proj_name=" + proj_name
            });
        });
};

// Delete all Projects from the database: [DELETE] api/projects
exports.deleteAll = (req, res) => {
    Project.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Projects were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Projects."
            });
        });
};
