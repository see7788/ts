import {
    LoadURLOptions,
    BrowserWindowConstructorOptions
} from "electron"

declare global {
    namespace NodeJS {
        interface Global {
            istate: IState;
            wacthIng: boolean;
            pcTips: (title: string, file?: string, silent?: boolean) => void;
            pcConsole: (title: string, file?: string, silent?: boolean) => any;
        }
    }
}

type SocketSend = <
    CMD extends SocketCmd,
    DB extends SocketParamDb[CMD][0]
    >(cmd: CMD, db: DB, toid_socket?: string) => Promise<any>;
interface SocketRes{
    cmd: SocketCmd,
    db: SocketParamDb[SocketCmd][1],
    fromid_socket?: number
}
type SocketCmd = keyof SocketParamDb;
interface SocketParamDb {
    //cmd:[send,req]
    '': ['', string],
    setTimeout: ['', ''],
    login: ['', IState['id_socket']],
}
interface IState {
    id_wins: number;
    openBox_wins?: boolean;
    nodeUid_login: string;
    id_socket: '请输入手机号' | '请求注册,等待客服相应' | '已注册已登录';
    tel_login: string;
    shops_login: {
        [shopname: string]: {
            shoppassword: string;
        };
    };
    db: {
        [md5TopUrl_proid in string | number]: {
            proid: string;
            title: string;
            price: number;
            pic: string;
            url: string;
        }
    };
    // db_kefu: {
    //     [shopname: string]: {
    //         id_socket: number;
    //         datetime: TimeRanges;
    //         db: IState["db"];
    //     };
    // };
}
interface WinOptions {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    webPreferences?: {
        plugins?: true,
        nodeIntegrationInSubFrames?: false,// Boolean (可选项)(实验性)，
        // 是否允许在子页面(iframe)或子窗口(child window)中集成Node.js
        // 预先加载的脚本会被注入到每一个iframe，你可以用 process.isMainFrame 来判断当前是否处于主框架（main frame）中。
        webviewTag?: true;// 是否启用 <webview> tag标签. 默认值为 false
        nodeIntegrationInWorker?: false; // Boolean(可选) - 是否在Web工作器中启用了Node集成.默认值为 false
        nodeIntegration?: false; // node的功能
        // preload?: string;// 无论页面是否集成Node, 此脚本都可以访问所有Node API 脚本路径为文件的绝对路径。
        allowRunningInsecureContent?: false,// 布尔值（可选）
        // -允许https页面运行来自http URL的JavaScript，CSS或插件。默认值false。
    }
}
interface WinSettingOptions extends BrowserWindowConstructorOptions { }
type WinSetting = {
    [k in number]: WinSettingOptions
}
interface WinsConfigOptions extends WinSettingOptions {
    label: string;
    click?: () => void;
    labelTrue?: true
    preload_?: () => Promise<string>
    preload?: string,
    crx_?: () => Promise<string>
    crx?: string,
    executeJavaScript?: string;
    loadURL?: [string, LoadURLOptions?]
    insertCSS_?: () => Promise<string>
    insertCSS?: string
}
type WinsConfig = {
    [k in number]: WinsConfigOptions
}
type SrcCrx = 'wxw';
type JsFile = 'xiaoxin/w4.js'|'xiaoxin/w5.js'|'xiaoxin/main.js' | 'xiaoxin/show.js' | 'xiaoxin/get.js';
type CssFile = 'xiaoxin/main.css';
