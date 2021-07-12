module.exports = app => {
    const members = require("../controllers/member.controller.js");

    var router = require("express").Router();

    // Create new member
    router.post("/", members.create);

    // Retrieve all members
    router.get("/", members.findAll);

    // Retrieve a single member with id
    router.get("/:username", members.findOne);

    // Update a member by id
    router.put("/:username", members.updateByUsername);

    // Delete a member by id
    router.delete("/:username", members.deleteByUsername);

    // Remove all members
    router.delete("/", members.deleteAll);


    app.use("/api/members", router);
}