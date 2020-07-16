import ElectronStore = require("electron-store");
const stateCache = new ElectronStore();
const cacheRootK = 'ttt';
require('electron').remote.getGlobal('istate').db = 'new value'
'C:/Users/fang/AppData/Local/Google/Chrome/User Data/Default/Extensions/ioadaikpljilagoddljnamloiebcoopb'
export const setState = async () => stateCache.set({ [cacheRootK]: global.istate });
export const getState = (): Promise<never> => new Promise( ok => {
    const state = stateCache.get(cacheRootK);
    if (state) {
        global.istate  = state;
    } else {
        global.istate  = {
            nodeUid_login: "",
            tel_login: "",
            id_socket:'请输入手机号',
            shops_login: {},
            db: {},
            id_wins: 0,
        }
    }
    global.pcConsole('state启动', __filename);
    ok();
})
