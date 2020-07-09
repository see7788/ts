import * as path from "path"
import * as fs from "fs";
import { initSocket } from './socket'
import { getState, setState } from "./state";
import { WinsConfig, SrcCrx, JsFile, CssFile } from "./type";
import { Menu, BrowserWindow, MenuItemConstructorOptions, } from "electron"
const erFileAllPath = (f: string) => path.resolve(__dirname, '../er', f)
const crx = (...p: SrcCrx[]) => path.resolve(`./crx/${p}`);

const js = (p: JsFile): Promise<string> => new Promise((ok, e) => {
    const v = erFileAllPath(p);
    ok(v)
})
const css = (p: CssFile): Promise<string> => new Promise(
    (ok, err) => fs.readFile(
        erFileAllPath(p),
        {},
        (e, db) => e ? err(e) : ok(db.toString())
    ))
let win: BrowserWindow;
const winsConfig: WinsConfig = {
    0: {
        label: '查看',
        loadURL: ['https://www.baidu.com'],
        winOptions: {
            width: 500,
            height: 500,
            webPreferences: {
                plugins: true,
                webviewTag: true,// 是否启用 <webview> tag标签. 默认值为 false
                nodeIntegrationInWorker: false, // Boolean(可选) - 是否在Web工作器中启用了Node集成.默认值为 false
                nodeIntegration: false, // node的功能
                preload: () => js('xiaoxin/get.js')
            }
        },
    },
    1: {
        label: '刷新',
        labelTrue: true,
        click: () => win.webContents.reload()
    },
    2: {
        label: "后退",
        labelTrue: true,
        click: () => win.webContents.goBack()
    },
    3: {
        label: "前进",
        labelTrue: true,
        click: () => win.webContents.goForward()
    },
    4: {
        label: '抓淘宝',
        labelTrue: true,
        loadURL: ['https://taobao.com'],
        insertCSS: () => css('xiaoxin/main.css'),
        winOptions: {
            webPreferences: {
                preload: () => js('xiaoxin/get.js')
            }
        },
    },
    5: {
        label: '抓敦煌',
        labelTrue: true,
        loadURL: ['https://www.dhgate.com/#hp-head-8'],
        insertCSS: () => css('xiaoxin/main.css'),
        winOptions: {
            webPreferences: {
                preload: () => js('xiaoxin/get.js')
            }
        },
    },
    6: {
        label: '客服工作台',
        labelTrue: true,
        crx: () => crx('wxw'),
        // dunhuan='https://www.wxwerp.com/m/publish/?erp=true&s=955036&platform=3'
    }
};
const initMenu = () => new Promise((ok) => {
    const c1: MenuItemConstructorOptions[] = [];
    Object.values(winsConfig).forEach((v, i) => {
        if (v['labelTrue']) {
            c1.push({
                label: v.label,
                click: v['click'] ? v.click: () => {
                    global.istate.id_wins = i
                    createWindow()
                }
            });
        }
    });
    const c2 = Menu.buildFromTemplate(c1);
    Menu.setApplicationMenu(c2);
    ok()
})
const createWindow = (): Promise<never> => {
    return new Promise(async (ok) => {
        const wid = global.istate.id_wins;
        const config = winsConfig[wid];
        const preload = config['winOptions'] &&
            config['winOptions']['webPreferences'] &&
            config['winOptions']['webPreferences']['preload'];
        if (preload && typeof preload === 'function') {
            winsConfig[wid].winOptions.webPreferences.preload = await preload();
        }
        win = new BrowserWindow(winsConfig[wid]['winOptions']);
        if (config['loadURL']) {
            win.loadURL(...config.loadURL);
        } else {
            global.pcTips('没有url');
        }
        win.webContents.openDevTools()// ({ mode: "detach" });
        win.webContents.on("did-finish-load", async () => {
            if (config['insertCSS']) {
                if (typeof config['insertCSS'] === 'function') {
                    winsConfig[wid]['insertCSS'] = await config['insertCSS']()
                }
                win.webContents.insertCSS(winsConfig[wid]['insertCSS'] as string);
            }
            if (winsConfig[wid]['executeJavaScript']) {
                win.webContents.executeJavaScript(winsConfig[wid]['executeJavaScript'])
            }
        });
        win.webContents.on("new-window", (e, url) => {
            e.preventDefault();
            setState()
            win.loadURL(url);
        });
        win.on('closed', () => { win = null })
        setState();
        ok();
    })
};

export const init = () => getState().then(
    initSocket
).then(
    initMenu
).then(
    createWindow
)