import {
  app,
  BrowserWindow,
  Notification
} from "electron";
import { init } from './configs/index'
app.whenReady().then(
  init
).then(
  test
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

function test() {
  return new Promise((ok) => {
    global.pcConsole('测试窗口启动', __dirname)
    const c = new BrowserWindow({ x: 0, y: 800 });
    const u = [
      'http://www.ruanyifeng.com/',
      'http://www.w3cbus.com/',
      'https://shan-shui-inf.glitch.me',
      'https://huaban.com/',
      'http://www.baidu.com/'
    ];
    const nowU = u[2];
    c.loadURL(nowU)
    c.webContents.on("new-window", (e, url) => {
      e.preventDefault();
      global.pcConsole('窗口new-window'+process.pid, __filename);
      c.loadURL(url);
  });
    ok()
  })
}
