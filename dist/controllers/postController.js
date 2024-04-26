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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postModel_1 = __importDefault(require("../models/postModel"));
require("../models/userModel");
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const PostApi = {
    getPosts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt";
        const q = req.query.q ? { content: new RegExp(req.query.q) } : {};
        const data = yield postModel_1.default.find(q)
            .populate({
            path: "user",
            select: "name photo",
        })
            .sort(timeSort);
        (0, responseHandler_1.default)({ res, code: 200, data });
    }),
    addPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user, content, image } = req.body || {};
            const data = yield postModel_1.default.create({
                user,
                content: content.trim(),
                image: image.trim(),
            });
            (0, responseHandler_1.default)({ res, code: 200, data });
        }
        catch (error) {
            (0, responseHandler_1.default)({ res, code: 400, error });
        }
    }),
    deletePosts: (res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield postModel_1.default.deleteMany({});
            (0, responseHandler_1.default)({ res, code: 200, data: [] });
        }
        catch (_a) {
            (0, responseHandler_1.default)({ res, code: 500 });
        }
    }),
    deletePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (id) {
                yield postModel_1.default.findByIdAndDelete(id);
                (0, responseHandler_1.default)({ res, code: 200 });
            }
            else {
                (0, responseHandler_1.default)({ res, code: 400 });
            }
        }
        catch (_b) {
            (0, responseHandler_1.default)({ res, code: 400 });
        }
    }),
    updatePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { content } = req.body;
            if (content.trim() && id) {
                const data = yield postModel_1.default.findByIdAndUpdate(id, {
                    $set: { content: content.trim() },
                });
                (0, responseHandler_1.default)({ res, code: 200, data });
            }
            else {
                (0, responseHandler_1.default)({ res, code: 400 });
            }
        }
        catch (_c) {
            (0, responseHandler_1.default)({ res, code: 400 });
        }
    }),
};
exports.default = PostApi;
