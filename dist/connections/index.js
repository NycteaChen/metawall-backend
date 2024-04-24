"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../../config.env" });
const DB = ((_a = process.env.DATABASE) === null || _a === void 0 ? void 0 : _a.replace("<password>", process.env.DATABASE_PASSWORD || "")) || "";
mongoose_1.default
    .connect(DB)
    .then(() => console.log("資料庫連接成功"))
    .catch((error) => console.log(error));
