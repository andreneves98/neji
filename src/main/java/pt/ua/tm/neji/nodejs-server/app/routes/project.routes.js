module.exports = app => {
    const projects = require("../controllers/project.controller.js");

    var router = require("express").Router();

    // Create new project
    router.post("/", projects.create);

    // Retrieve all Projects
    router.get("/", projects.findAll);

    // Retrieve a single Project with name
    router.get("/:proj_name", projects.findOne);

    // Update a Project by id
    router.put("/:proj_id", projects.updateByID);

    // Update a Project by name
    router.put("/", projects.updateByName);

    // Delete a Project by id
    router.delete("/:proj_id", projects.deleteByID);

    // Remove all Projects
    router.delete("/", projects.deleteAll);


    app.use("/api/projects", router);
}