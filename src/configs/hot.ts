import path from "path"
import gulp from "gulp";
import chokidar from "chokidar"
import { app, BrowserWindow } from "electron"
import { createProject } from "gulp-typescript";
const buildFile = () => {
    const tsProject = createProject("tsconfig.json");
    tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("build"));
    gulp.src(['./src/**/*.html', './src/**/*.js', './src/**/*.css']).pipe(gulp.dest("./build"));
}
// 备选热更新（玩命打包式更新）
// buildFile放到15行与18行
// 命令"js": "electron ./build/background.js",

//  首选热更新ts文件，"start": "electron -r ts-node/register ./",
export const hotFile = () => new Promise(ok => {
    chokidar.watch('./src').on('change', (pathstr, stats) => {
        if (stats && !global.wacthIng) {
            global.wacthIng = true
            setTimeout(() => {
                // pathstr.indexOf('configs')
                if (path.extname(pathstr) === '.ts') {
                    global.pcConsole('关闭重开app', __dirname)
                    app.relaunch()
                    app.exit(0)
                } else {
                    global.pcConsole('遍历win刷新内容', __dirname)
                    BrowserWindow.getAllWindows().forEach(bw => {
                        const ctx = bw.webContents
                        if (ctx.isDevToolsOpened()) {
                            // if reopen devTool is needed
                            ctx.closeDevTools()
                            ctx.reloadIgnoringCache()
                            ctx.on("did-frame-finish-load", () => {
                                ctx.once("devtools-opened", () => {
                                    bw.focus()
                                })
                                ctx.openDevTools()
                            })
                        } else {
                            ctx.reloadIgnoringCache()
                        }
                    })
                }
                global.wacthIng = false
            }, 500);
        }
    })
    global.pcConsole('监听启动', __dirname)
    ok()
})