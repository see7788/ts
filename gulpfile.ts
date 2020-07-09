import gulp from "gulp";
import nodemon from "gulp-nodemon";
import { createProject } from "gulp-typescript";
// import { watch } from "chokidar";
const tsProject = createProject("tsconfig.json");
gulp.task("default", async () => {
  // new Promise((ok)=>{
  //   require('electron-reloader')(module);
  //   ok()
  // }).catch(console.log)
  gulp.src(['src/*.html', 'src/*.js', 'src/*.css']).pipe(gulp.dest("build"));
  nodemon({
    script: './build/background.js',
    ignore: ["gulpfile.js", "node_modules/", "public/**/*.*"],
    env: {
      'NODE_ENV': 'development'
    }
  })
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("build"));
});
// try {
//   // tslint:disable-next-line: no-var-requires
//   require('electron-reloader')(module);
// // tslint:disable-next-line: no-empty
// } catch (_) { }
