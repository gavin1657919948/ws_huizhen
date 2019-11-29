export enum CodeType {
    CODE_200 = 200, // 请求成功
    CODE_201 = 201,
    CODE_202 = 202,
    CODE_206 = 206,
    CODE_401 = 401, // 用户登录失败
    CODE_403 = 403, // 用户无访问权限
    CODE_409 = 409, // 自定义业务错误
    CODE_422 = 422,
    CODE_429 = 429, // 频繁访问异常
    CODE_500 = 500, // 服务器异常
}

export enum UploadActionType {
    IMPORT = 'IMPORT',
    UPLOAD = 'UPLOAD',
}
