"use strict";
const codeMessageEnum = Object.freeze({
    400: "欄位未填寫正確，或無此 id",
    500: "伺服器錯誤",
    200: "成功",
});
const responseHandler = ({ res, code, data, error }) => {
    res.status(code).json({
        status: code === 200,
        message: codeMessageEnum[code],
        data,
        error,
    });
};
module.exports = responseHandler;
