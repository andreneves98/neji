module.exports = app => {
    const projects = require("../controllers/project.controller.js");

    var router = require("express").Router();

    // Create new project
    router.post("/", projects.create);


    app.use("/api/projects", router);
}