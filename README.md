热重载
// // https://github.com/youyinnn/electron-nice-auto-reload
//electron-reloader 
electron-connect
chokidar
electron-reloader
  gulp-nodemon
  nodemon
  tsc -w
node -r ts-node/register

安装谷歌拓展插件
    // extensions.loadExtension(p2)
    // const p2='/AppData/Local/Google/Chrome/User Data/Default/Extensions/ioadaikpljilagoddljnamloiebcoopb'
    // BrowserWindow.addExtension(p2);
    // const extensions = new ExtensibleSession();//不能用


node环境
 process.env.npm_lifecycle_event;正在运行的package.scripts脚本名
process.env.HOME 用户目录
process.cwd() 工作根目录
process.resourcesPath 资源目录路径
 BrowserWindow.getAllWindows() // 所有打开的窗口的数组
BrowserWindow.getFocusedWindow() // 此应用程序中当前获得焦点的窗口
onst winid = BrowserWindow.getAllWindows().length;