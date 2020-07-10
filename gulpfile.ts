import gulp from "gulp";
import { createProject } from "gulp-typescript";

const tsProject = createProject("tsconfig.json");
gulp.task("default", async () => {
  gulp.src(['src/*.html', 'src/*.js', 'src/*.css']).pipe(gulp.dest("build"));
  // app.isReady
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("build"));
});
// try {
//   // tslint:disable-next-line: no-var-requires
//   require('electron-reloader')(module);
// // tslint:disable-next-line: no-empty
// } catch (_) { }
