module.exports = app => {
    const documents = require("../controllers/document.controller.js");

    var router = require("express").Router();

    // Create new document
    router.post("/", documents.create);

    // Retrieve all documents
    router.get("/", documents.findAll);

    // Retrieve a single document with title
    router.get("/:doc_id", documents.findOne);

    // Count number of documents belonging to a project
    router.get("/count?proj_id=:proj_id", documents.countDocs);

    // Update a document by id
    router.put("/:doc_id", documents.updateByID);

    // Update a document by title
    router.put("/", documents.updateByTitle);

    // Delete a document by id
    router.delete("/:doc_id", documents.deleteByID);

    // Remove all documents
    router.delete("/", documents.deleteAll);


    app.use("/api/documents", router);
}