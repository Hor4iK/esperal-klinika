import cleanCSS from "gulp-clean-css";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import rename from "gulp-rename";
import size from "gulp-size";
import browsersync from "browser-sync";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

export function styles() {
  return app.gulp
    .src(app.path.src.styles)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(app.gulp.dest(app.path.dist.styles))
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    
    .pipe(rename("style.min.css"))
    .pipe(size())
    .pipe(sourcemaps.write("./"))
    .pipe(app.gulp.dest(app.path.dist.styles))
    
    .pipe(browsersync.stream());
}

export function buildCss() {
  return app.gulp
    .src(app.path.src.buildCss)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(size())
    .pipe(app.gulp.dest(app.path.dist.buildCss));
}

export function allStyles() {
  return app.gulp
  .src(app.path.src.allStyles)
  .pipe(app.gulp.dest(app.path.dist.allStyles));
}