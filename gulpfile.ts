import {app} from "electron";
import { task, watch, dest } from "gulp";
import ts from "gulp-typescript";
// const tsProject = ts.createProject("tsconfig.json");
task("default", () => {
  // watch(['./src/background.ts', './src/config/*.ts'], () => {
  //   app.relaunch()
  //   app.exit(0)
  // });
  // watch(['./*.{html.js.css}'], restart);
 // tsProject.src().pipe(tsProject()).js.pipe(dest("./dist"));
});