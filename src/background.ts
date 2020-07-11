import {
  app,
  BrowserWindow,
  Notification
} from "electron";
import { init } from './configs/index'

app.whenReady().then(
  () => Promise.resolve(global.pcConsole('开始启动', __filename))
).then(
  init
// ).then(
//   test
).then(
  () => global.pcConsole('启动成功', __filename)
).catch(
  console.log
)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
  app.exit(0)
  process.kill(process.pid)
  process.exit()
})


global.pcTips = (title, file, silent) => {
  const notification = new Notification({
    // 通知的标题, 将在通知窗口的顶部显示
    title,
    // 通知的正文文本, 将显示在标题或副标题下面
    body: (file ? file : ''),
    // false有声音，true没声音
    silent: silent ? silent : false,
    // 通知的超时持续时间 'default' or 'never'
    timeoutType: 'never',
  })
  notification.show()
}

global.pcConsole = global.pcTips


// function test() {
//   return new Promise((ok) => {
//     global.pcConsole('测试窗口启动', __dirname)
//     const c = new BrowserWindow({ x: 2560, y: 2 });
//     const u = [
//       'http://www.ruanyifeng.com/',
//       'http://www.w3cbus.com/',
//       'https://shan-shui-inf.glitch.me',
//       'https://huaban.com/',
//       'http://www.baidu.com/'
//     ];
//     const nowU = u[4];
//     c.loadURL(nowU)
//     c.webContents.on("new-window", (e, url) => {
//       e.preventDefault();
//       global.pcConsole('窗口new-window'+process.pid, __filename);
//       c.loadURL(url);
//   });
//     ok()
//   })
// }
