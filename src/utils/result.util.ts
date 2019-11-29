import { CodeType } from '../enum/enum';

export class ResultUtil {
    constructor(code: number, message: string, data: any) { }

    static success(msg?: string, dataContent?: any) {
        return { code: CodeType.CODE_200, message: msg, data: dataContent };
    }

    static error(codeContent: number, msg: string, dataContent?: any) {
        return { code: codeContent, message: msg, data: dataContent };
    }
}