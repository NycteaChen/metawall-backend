"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "貼文姓名未填寫"],
    },
    content: {
        type: String,
        required: [true, "內容未填寫"],
    },
    image: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
    type: {
        type: String,
        default: "",
    },
    tags: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true,
    versionKey: false,
});
const Post = mongoose_1.default.model("Post", postSchema);
exports.default = Post;
