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