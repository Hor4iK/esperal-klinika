//Получаем имя папки проекта
import * as nodePath from "path";
export const rootFolder = nodePath.basename(nodePath.resolve());

//Путь исходных файлов и путь результирующих файлов
export const distFolder = "dist";
export const srcFolder = "src";
export const path = {
  dist: {
    html: `${distFolder}/`,
    styles: `${distFolder}/assets/css/`,
    buildCss: `${distFolder}/assets/css/build/`,
    scripts: `${distFolder}/assets/js/`,
    images: `${distFolder}/assets/img/`,
    fonts: `${distFolder}/assets/fonts/`,
  },
  src: {
    html: `${srcFolder}/*.html`,
    panini: `${srcFolder}/tpl/**/*.html`,
    styles: `${srcFolder}/assets/css/styles.scss`,
    buildCss: `${srcFolder}/assets/css/build/*.{css,scss}`,
    allstyles: `${srcFolder}/assets/css/vendor/*.scss`,
    scripts: `${srcFolder}/assets/js/**/*.js`,
    images: `${srcFolder}/assets/img/**/*.{jpg,png,svg,gif,ico,webp}`,
    imagesWebp: `${srcFolder}/assets/img/**/*.{jpg,jpeg,png}`,
    fonts: `${srcFolder}/assets/fonts/`,
  },
};
