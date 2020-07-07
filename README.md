// // https://www.npmjs.com/package/chokidar
// // https://github.com/youyinnn/electron-nice-auto-reload
//electron-reloader 不能用
// const client = require('electron-connect').client;不能用

    // extensions.loadExtension(p2)
    // const p2='/AppData/Local/Google/Chrome/User Data/Default/Extensions/ioadaikpljilagoddljnamloiebcoopb'
    // BrowserWindow.addExtension(p2);
// const extensions = new ExtensibleSession();//不能用


<!-- process.env.npm_lifecycle_event;返回当前正在运行的package.scripts脚本名称 -->
// process.env.HOME 用户目录
//process.cwd() 工作根目录
//process.resourcesPath 资源目录路径
  // app.relaunch()// 重启实例
        // app.exit(0)
        console.dir({type:'change',path:f})
        BrowserWindow.getAllWindows().forEach(winId =>{
            winId.webContents.reloadIgnoringCache();
            // BrowserWindow.fromId(winId)?BrowserWindow.fromId(winId).reload():console.log(`winid${winId}:miss`)
        })

        // BrowserWindow.getAllWindows() // 所有打开的窗口的数组
// BrowserWindow.getFocusedWindow() // 此应用程序中当前获得焦点的窗口
    // const winid = BrowserWindow.getAllWindows().length;


// export const addWacth = (...paths: string[]) => new Promise((ok) => {
//     paths.forEach(js => {
//         let ts = js.replace('\\dist\\', '\\src\\');
//         ts = ts.replace('.js', '.ts');
//         files = [...files, js]
//     })
//     ok()
// })
// // addWacth(path.resolve(__dirname,`../${process.env.npm_package_main}`))
// export const get = () => watcher.getWatched()


// const gulp = require("gulp");
// const ts = require("gulp-typescript");
// const tsProject = ts.createProject("tsconfig.json");
// const {start,restart}=require('electron-connect').server.create();
// gulp.task("default", () => {
//   start();
//   gulp.watch('./src',restart)
//   tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("./dist"));
// });



我说造一栋大楼框架，你摆弄几下就造出来大概，然后你说一二百可以，收了款。
结果，你造着造着，突然有搭建不起来的感觉.....