"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Post = require("../models/postModel");
const responseHandler = require("../utils/responseHandler");
const PostApi = {
    getPosts: (res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield Post.find();
        responseHandler({ res, code: 200, data });
    }),
    addPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, content } = req.body || {};
            const data = yield Post.create({
                name,
                content,
            });
            responseHandler({ res, code: 200, data });
        }
        catch (error) {
            responseHandler({ res, code: 400, error });
        }
    }),
    deletePosts: (res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Post.deleteMany({});
            responseHandler({ res, code: 200, data: [] });
        }
        catch (_a) {
            responseHandler({ res, code: 500 });
        }
    }),
    deletePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params || {};
            yield Post.findByIdAndDelete(id);
            responseHandler({ res, code: 200 });
        }
        catch (_b) {
            responseHandler({ res, code: 400 });
        }
    }),
    updatePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params || {};
            const { content } = req.body || {};
            if (content && id) {
                const data = yield Post.findByIdAndUpdate(id, {
                    $set: { content },
                });
                responseHandler({ res, code: 200, data });
            }
            else {
                responseHandler({ res, code: 400 });
            }
        }
        catch (_c) {
            responseHandler({ res, code: 400 });
        }
    }),
};
module.exports = PostApi;
