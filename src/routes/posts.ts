import express from "express";
import PostApi from "../controllers/postController";

const router = express.Router();

router.get("/", function (req, res) {
  PostApi.getPosts(req, res);
});

router.post("/", function (req, res) {
  PostApi.addPost(req, res);
});

router.delete("/", function (req, res) {
  PostApi.deletePosts(res);
});

router.patch("/:id", function (req, res) {
  PostApi.updatePost(req, res);
});

router.delete("/:id", function (req, res) {
  PostApi.deletePost(req, res);
});

module.exports = router;
