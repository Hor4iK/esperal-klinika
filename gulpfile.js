//Импорт модулей
import gulp from 'gulp';

//Импорт путей
import { path, distFolder, srcFolder } from "./gulp/config/path.js";

//Передача значений в глобальную переменную
global.app = {
  path: path,
  gulp: gulp,
  distFolder: distFolder,
  srcFolder: srcFolder,
};

//Импорт задач
import { html } from "./gulp/tasks/html.js";
import { clean } from "./gulp/tasks/clean.js";
import { styles } from "./gulp/tasks/styles.js";
import { buildCss } from "./gulp/tasks/styles.js";
import { scripts } from "./gulp/tasks/scripts.js";
import { img } from "./gulp/tasks/img.js";
import { watch } from "./gulp/tasks/watch.js";
import { cleanFonts } from "./gulp/tasks/clean.js";
import { otfConvert } from "./gulp/tasks/fonts.js";
import { ttfConvert } from "./gulp/tasks/fonts.js";
import { exportFonts } from "./gulp/tasks/fonts.js";
import { zipRun } from "./gulp/tasks/zip.js";
import { webpRun } from "./gulp/tasks/webp.js";

//Выполнение сценария по умолчанию
gulp.task(
  "default",
  gulp.series(
    clean,
    //normilize,
    gulp.parallel(html, styles, buildCss, scripts, img, webpRun, cleanFonts, otfConvert, ttfConvert, exportFonts),
    watch
  )
);


//Cценарий архивирования готовой версии проекта
gulp.task("zip", zipRun);

//Сценарий конвертации изображений в формат .webp
gulp.task("webp", webpRun);
