import htmlmin from "gulp-htmlmin"
import size from 'gulp-size';
import panini from 'panini';
import browsersync from 'browser-sync'

export function html(){
    return app.gulp.src(app.path.src.html)
        .pipe(panini({
            root: 'src/',
            layouts: 'src/tpl/layouts/',
            partials: 'src/tpl/partials/',
            helpers: 'src/tpl/helpers/',
            data: 'src/tpl/data/'
        }))
       // .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(size())
        .pipe(app.gulp.dest(app.distFolder))
        .pipe(browsersync.stream())
}
