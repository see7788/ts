import {
  app,
  BrowserWindow,
  Notification
} from "electron";
import {init} from './configs/index'

app.whenReady().then(
  //   init
  // ).then(
  () => {
    global.pcTips('初始化完成22e', process.cwd())
    const c = new BrowserWindow();
    const u = [
      'http://www.ruanyifeng.com/',
      'http://www.w3cbus.com/',
      'http://www.baidu.com/'
    ];
    c.loadURL(u[1])
  }
)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
  app.exit(0)
  process.kill(process.pid)
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