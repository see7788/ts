import * as path from "path"
import * as fs from "fs";
import * as CryptoJS from "crypto-js";
function to_base64(object: object): string {
    const json = JSON.stringify(object)
    const wordArray = CryptoJS.enc.Utf8.parse(json);// 中间层，算法用，不知道干嘛的
    const base64 = CryptoJS.enc.Base64.stringify(wordArray);
    return base64;
}
function from_base64(base64: string): object {
    const json = CryptoJS.enc.Base64.parse(base64).toString(CryptoJS.enc.Utf8);
    return JSON.parse(json);
}
function str_to_md5(data: any): (string) {
    return CryptoJS.MD5(JSON.stringify(data)).toString();
}

export {
    from_base64,
    to_base64,
    str_to_md5
}