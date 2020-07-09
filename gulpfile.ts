import gulp from "gulp";
import nodemon from "gulp-nodemon";
import { createProject } from "gulp-typescript";
// import { watch } from "chokidar";
const tsProject = createProject("tsconfig.json");

gulp.task("default", async () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("build"));
});

// try {
//   // tslint:disable-next-line: no-var-requires
//   require('electron-reloader')(module);
// // tslint:disable-next-line: no-empty
// } catch (_) { }
