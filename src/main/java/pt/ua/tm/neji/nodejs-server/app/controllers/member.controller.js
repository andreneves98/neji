const db = require("../models");
const Member = db.members;
const Op = db.Sequelize.Op;

// Create a new member: [POST] api/members
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username && !req.body.email && !req.body.first_name && !req.body.last_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a member
    const member = {
        username: req.body.username,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,        
        //password: req.body.password
    }

    // Save member in the database
    Member.create(member)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the member."
            });
        });
};

// Retrieve all members from the database: [GET] api/members
exports.findAll = (req, res) => {
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    // if we want to find all members with a given name
    var condition = first_name ? { first_name: { [Op.iLike]: `%${first_name}%` } } : null;

    Member.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving members."
        });
    });
};

// Find a single member with a username: [GET] api/member/:username
exports.findOne = (req, res) => {
    const username = req.params.username;

    Member.findByPk(username)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Member with username=" + username
            });
        });
};

// Update a member by the username in the request: [PUT] api/member/:username
exports.updateByUsername = (req, res) => {
    const username = req.params.username;

    Member.update(req.body, {
        where: { username: username }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Member was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Member with username=${username}. Maybe Member was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Member with username=" + username
            });
        });
};

// Delete a Member with the specified username in the request: [DELETE] api/members/:username
exports.deleteByUsername = (req, res) => {
    const username = req.params.username;

    Member.destroy({
        where: { username: username }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Member was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Member with username=${username}. Maybe Member was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Member with username=" + username
            });
        });
};

// Delete all Members from the database: [DELETE] api/members
exports.deleteAll = (req, res) => {
    Member.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Members were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Members."
            });
        });
};
