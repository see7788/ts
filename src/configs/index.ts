import fs from "fs";
import path from "path"
import { exec } from 'child_process'
import { hotFile } from "./hot";
import { initSocket } from './socket'
import { getState, setState } from "./state";
import { WinsConfig, SrcCrx, JsFile, CssFile } from "./type";
import { Menu, BrowserWindow, MenuItemConstructorOptions } from "electron"
const urlPath = (f: string) => '../er/' + f;
const crx = (p: SrcCrx): Promise<string> => new Promise(ok => ok(path.resolve('../crx', p)));

const js = (p: JsFile): Promise<string> => new Promise((ok) => ok(urlPath(p)))
const css = (p: CssFile): Promise<string> => new Promise(
    (ok, err) => fs.readFile(
        path.resolve(__dirname, urlPath(p)),
        {},
        (e, db) => e ? err(e) : ok(db.toString())
    ))
let win: BrowserWindow;
const winsConfig: WinsConfig = {
    0: {
        label: '查看',
        loadURL: ['https://taobao.com'],
        preload_: () => js('xiaoxin/main.js'),
        insertCSS_: () => css('xiaoxin/main.css'),
        x: 0,
        y: 0,
        width: 800,
        height: 500,
        // executeJavaScript: 'alert("this is a test!");'
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
        label: '抓敦煌抓淘宝',
        labelTrue: true,
        loadURL: ['https://taobao.com'],
        insertCSS_: () => css('xiaoxin/main.css'),
        preload_: () => js('xiaoxin/w4.js'),
        // executeJavaScript: 'alert("this menu4!");',
        x: 0,
        y: 0,
        width: 800,
        height: 500,
    },
    6: {
        label: '客服2工作台',
        labelTrue: true,
        crx_: () => crx('wxw'),
        // dunhuan='https://www.wxwerp.com/m/publish/?erp=true&s=955036&platform=3'
    }
}
const initMenu = () => new Promise((ok) => {
    let c = winsConfig[global.istate.id_wins];
    if (c === undefined || c['loadURL'] === undefined) {
        global.istate.id_wins = 0;
        c = winsConfig[0];
    }
    const c1: MenuItemConstructorOptions[] = [];
    Object.values(winsConfig).forEach((v, i) => {
        if (v['labelTrue']) {
            const click = v['click'] ? v.click : () => {
                global.istate.id_wins = i
                global.pcConsole('menu' + i + 'open', __filename);
                createWindow()
            }
            if (v['click'] || v['loadURL']) {
                c1.push({
                    label: v.label,
                    click
                });
            }
        }
    });
    const c2 = Menu.buildFromTemplate(c1);
    Menu.setApplicationMenu(c2);
    global.pcConsole('menu启动', __filename);
    ok()
})
const createWindow = (): Promise<never> => {
    return new Promise(async (ok) => {
        const id = global.istate.id_wins;
        global.pcConsole('win启动', __filename);
        const c = winsConfig[id];
        if (c['preload_']) {
            if (winsConfig[id]['webPreferences'] === undefined) {
                winsConfig[id]['webPreferences'] = {};
                if (winsConfig[id]['webPreferences']['preload'] === undefined) {
                    winsConfig[id]['webPreferences']['preload'] = await c['preload_']();
                }
            }
        }
        win = new BrowserWindow({
            webPreferences: winsConfig[id]['webPreferences'],
            width: c['width'],
            height: c['height'],
            x: c['x'],
            y: c['y'],
            title: c['label']
        });
        win.webContents.openDevTools({ mode: "right" });
        win.loadURL(...c.loadURL);
        win.setTitle(c['label']);
        win.webContents.on("did-finish-load", async () => {
            if (c['insertCSS_']) {
                if (c['insertCSS'] === undefined) {
                    winsConfig[id]['insertCSS'] = await c['insertCSS_']()
                }
                win.webContents.insertCSS(winsConfig[id]['insertCSS']);
            }
            if (c['executeJavaScript']) {
                win.webContents.executeJavaScript(c['executeJavaScript'])
            }
        });
        win.webContents.on("new-window", (e, url) => {
            e.preventDefault();
            setState();
            win.loadURL(url);
            global.pcConsole('win' + id + '线程' + process.pid + 'new-window', __filename);
        });
        win.on('close', () => {
            global.pcConsole('win' + id + '线程' + process.pid + 'close', __filename);
        })
        win.on('closed', () => {
            global.pcConsole('win' + id + '线程' + process.pid + 'closed', __filename);
            setState();
        })
        ok();
    })
};

export const init = () => hotFile().then(
    getState
).then(
    initSocket
).then(
    initMenu
).then(
    createWindow
)