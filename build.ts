import electronInstaller from 'electron-winstaller';
import gulp  from  "gulp";
import { exec } from 'child_process'
import { createProject } from "gulp-typescript";
const srcJs = () => new Promise(ok => {
    const tsProject = createProject("tsconfig.json");
    tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("srcJs"));
    gulp.src(['./src/**/*.html', './src/**/*.js', './src/**/*.css']).pipe(gulp.dest("./srcJs"));
    ok()
})
const outTo = () => electronInstaller.createWindowsInstaller({
    appDirectory: './srcJs',
    outputDirectory: './build',
    authors: 'My App Inc.',
    exe: 'myapp.exe'
})

srcJs().then(outTo).then(()=>console.log('ok')).catch(console.log)