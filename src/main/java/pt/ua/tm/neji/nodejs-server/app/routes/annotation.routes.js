module.exports = app => {
    const annotations = require("../controllers/annotation.controller.js");

    var router = require("express").Router();

    // Create new annotation
    router.post("/", annotations.create);

    // Retrieve all annotations
    router.get("/", annotations.findAll);

    // Retrieve a single annotation with concept_id
    router.get("/:concept_id", annotations.findOne);

    // Update a annotation by id
    router.put("/:concept_id", annotations.updateByID);

    // Delete a annotation by id
    router.delete("/:concept_id", annotations.deleteByID);

    // Remove all annotations
    router.delete("/", annotations.deleteAll);


    app.use("/api/annotations", router);
}