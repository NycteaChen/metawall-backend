"use strict";
var _a;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DB = (_a = process.env.DATABASE) === null || _a === void 0 ? void 0 : _a.replace("<password>", process.env.DATABASE_PASSWORD || "");
mongoose
    .connect(DB)
    .then(() => console.log("資料庫連接成功"))
    .catch((error) => console.log(error));
