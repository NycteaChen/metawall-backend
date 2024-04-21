"use strict";
const express = require("express");
const PostApi = require("../controllers/postController");
const responseHandler = require("../utils/responseHandler");
const router = express.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
    PostApi.getPosts(res);
});
router.post("/", function (req, res, next) {
    PostApi.addPost(req, res);
});
router.delete("/", function (req, res, next) {
    PostApi.deletePosts(res);
});
router.patch("/:id", function (req, res, next) {
    PostApi.updatePost(req, res);
});
router.delete("/:id", function (req, res, next) {
    PostApi.deletePost(req, res);
});
module.exports = router;
