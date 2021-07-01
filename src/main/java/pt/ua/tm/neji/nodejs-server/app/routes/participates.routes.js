module.exports = app => {
    const participates = require("../controllers/participates.controller.js");

    var router = require("express").Router();

    // Create new relation
    router.post("/", participates.create);

    // Retrieve all relations
    router.get("/", participates.findAll);

    // Retrieve all members that participate in a project with id
    router.get("/:proj_id", participates.findOne);

    // Remove a member from a project
    router.delete("/", participates.delete);

    // Delete all relations
    router.delete("/", participates.deleteAll);


    app.use("/api/project_members", router);
}