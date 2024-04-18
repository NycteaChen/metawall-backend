const codeMessageEnum: { [k: string]: string } = Object.freeze({
  400: "欄位未填寫正確，或無此 id",
  404: "無此路由",
  500: "伺服器錯誤",
  200: "成功",
});

const responseHandler = (
  res: any,
  code: number,
  data?: any[],
  error?: unknown,
  headerType: string = "application/json"
) => {
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": headerType,
  };
  res.writeHead(code, headers);

  switch (code) {
    case 200:
      if (Array.isArray(data)) {
        res.write(
          JSON.stringify({
            status: "success",
            message: codeMessageEnum[code],
            data,
          })
        );
      }
      break;
    default:
      res.write(
        JSON.stringify({
          status: "false",
          message: codeMessageEnum[code],
          error,
        })
      );
      break;
  }

  res.end();
};

module.exports = responseHandler;
