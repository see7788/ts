import path from "path"
import gulp from "gulp";
import chokidar from "chokidar"
import { build } from "electron-builder";
import { createProject } from "gulp-typescript";
import { app, BrowserWindow, Notification } from "electron"

const NPM_SCRIPT = process.env.npm_lifecycle_event;
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

global.pcConsole = NPM_SCRIPT ? global.pcTips : () => false;

const gulpbuild = () => new Promise(ok => {
    gulp.task('default', async () => {
        const tsProject = createProject("tsconfig.json");
        tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("build"));
        gulp.src(['../package.json', './src/**/*.html', './src/**/*.js', './src/**/*.css']).pipe(gulp.dest("build"));
    });
    ok()
})

//  首选热更新ts文件，"start": "electron -r ts-node/register ./",
const hotfile = () => new Promise(ok => {
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

export default () => new Promise(async (ok, err) => {
    switch (NPM_SCRIPT) {
        case 'src':
        case 'start':
            return hotfile().then(() => ok());
        case 'build':
        case 'dist':
            return gulpbuild().then(() => build()).then(()=>err('打包完成')).catch(e=>err('打包失败'));
        default:
           ok();
    }
})