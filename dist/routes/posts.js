"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = __importDefault(require("../controllers/postController"));
const router = express_1.default.Router();
router.get("/", function (req, res) {
    postController_1.default.getPosts(res);
});
router.post("/", function (req, res) {
    postController_1.default.addPost(req, res);
});
router.delete("/", function (req, res) {
    postController_1.default.deletePosts(res);
});
router.patch("/:id", function (req, res) {
    postController_1.default.updatePost(req, res);
});
router.delete("/:id", function (req, res) {
    postController_1.default.deletePost(req, res);
});
module.exports = router;
