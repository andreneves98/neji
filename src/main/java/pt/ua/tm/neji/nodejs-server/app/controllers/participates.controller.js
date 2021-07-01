const db = require("../models");
const Participates = db.participates;
const Op = db.Sequelize.Op;

// Add member to a project: [POST] api/project_members
exports.create = (req, res) => {
    // Validate request
    if (!req.body.proj_id && !req.body.member_id && !req.body.role) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Participates relation
    const participates = {
        proj_id: req.body.proj_id,
        member_id: req.body.member_id,
        role: req.body.role,
    }

    // Save relation in the database
    Participates.create(participates)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while adding the member to project with proj_id=" + participates.proj_id
            });
        });
};

// Retrieve all members participating in projects from the database: [GET] api/project_members
exports.findAll = (req, res) => {

    Participates.findAll({})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving project members."
        });
    });
};

// Find all members participating in specific project with a proj_id: [GET] api/project_members/:proj_id
exports.findOne = (req, res) => {
    const proj_id = req.params.proj_id;

    Participates.findByPk(proj_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Participates Relation with proj_id=" + proj_id
            });
        });
};

// Remove a Member from a project: [DELETE] api/project_members?member_id=member_id&proj_id=proj_id
exports.delete = (req, res) => {
    const member_id = req.query.member_id;
    const proj_id = req.query.proj_id;

    Participates.destroy({
        where: { member_id: member_id, proj_id: proj_id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Member was removed from the project successfully!"
                });
            } else {
                res.send({
                    message: `Cannot remove Member with member_id=${member_id} from project=${proj_id}. 
                        Maybe Member does not participate in that project or the project does not exist!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not remove Member with member_id=" + member_id + " from the project"
            });
        });
};

// Delete all Members from the database: [DELETE] api/project_members
exports.deleteAll = (req, res) => {
    Member.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Relations were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all relations."
            });
        });
};
