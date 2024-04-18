"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const responseHandler = require("./responseHandler");
const Post = require("./model/posts");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "././config.env" });
const DB = (_a = process.env.DATABASE) === null || _a === void 0 ? void 0 : _a.replace("<password>", process.env.DATABASE_PASSWORD || "");
mongoose
    .connect(DB)
    .then(() => console.log("資料庫連接成功"))
    .catch((error) => console.log(error));
const requestListener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });
    if (req.url === "/posts" && req.method === "GET") {
        try {
            const allPosts = yield Post.find();
            responseHandler(res, 200, allPosts);
        }
        catch (error) {
            responseHandler(res, 500, []);
        }
    }
    else if (req.url === "/posts" && req.method === "POST") {
        req.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { name, content } = JSON.parse(body);
                yield Post.create({
                    name,
                    content,
                });
                responseHandler(res, 200, yield Post.find());
            }
            catch (error) {
                responseHandler(res, 400, [], error);
            }
        }));
    }
    else if (req.url === "/posts" && req.method === "DELETE") {
        try {
            yield Post.deleteMany({});
            responseHandler(res, 200, []);
        }
        catch (_f) {
            responseHandler(res, 500);
        }
    }
    else if (((_b = req.url) === null || _b === void 0 ? void 0 : _b.startsWith("/posts/")) && req.method === "DELETE") {
        try {
            const id = ((_d = (_c = req.url) === null || _c === void 0 ? void 0 : _c.split("/")) === null || _d === void 0 ? void 0 : _d.pop()) || "";
            const allPosts = (yield Post.find()) || [];
            const target = allPosts.find((e) => { var _a; return id && ((_a = e._id) === null || _a === void 0 ? void 0 : _a.valueOf()) === id; });
            if (target) {
                yield Post.findByIdAndDelete(target === null || target === void 0 ? void 0 : target._id);
                responseHandler(res, 200, yield Post.find());
            }
            else {
                responseHandler(res, 400);
            }
        }
        catch (_g) {
            responseHandler(res, 400);
        }
    }
    else if (((_e = req.url) === null || _e === void 0 ? void 0 : _e.startsWith("/posts/")) && req.method === "PATCH") {
        req.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            var _h, _j;
            try {
                const { content } = JSON.parse(body);
                const id = ((_j = (_h = req.url) === null || _h === void 0 ? void 0 : _h.split("/")) === null || _j === void 0 ? void 0 : _j.pop()) || "";
                const allPosts = (yield Post.find()) || [];
                const target = allPosts.find((e) => { var _a; return id && ((_a = e._id) === null || _a === void 0 ? void 0 : _a.valueOf()) === id; });
                if (target && content) {
                    yield Post.findByIdAndUpdate(target._id, { $set: { content } });
                    responseHandler(res, 200, yield Post.find());
                }
                else {
                    responseHandler(res, 400);
                }
            }
            catch (_k) {
                responseHandler(res, 400);
            }
        }));
    }
    else if (req.url === "/posts" && req.method === "OPTIONS") {
        responseHandler(res, 200);
    }
    else {
        responseHandler(res, 404);
    }
});
const server = http.createServer(requestListener);
server.listen(process.env.PORT);
