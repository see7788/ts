
import {
  app,
  BrowserWindow,
  Notification
} from "electron";
import { init } from './configs/index'

app.whenReady().then(
//   () => Promise.resolve(global.pcTips('加载开始', process.cwd()))
// ).then(
  //   init
  // ).then(
  () => {
    const c = new BrowserWindow({width:500});
    c.webContents.openDevTools();
    const u = [
      'http://www.ruanyifeng.com/',
      'http://www.w3cbus.com/',
      'https://shan-shui-inf.glitch.me',
      'https://huaban.com/',
      'http://www.baidu.com/'
    ];
    const nowU = u[1];
    c.loadURL(nowU)
    global.pcTips('加载完成', process.cwd())
  }
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