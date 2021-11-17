const { series, parallel, src, dest} = require('gulp')
const del = require('del')
const browserrify = require('browserify')
const source = require('vinyl-source-stream')
const tsify = require('tsify')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')


function limpaDist(){
    return del(['dist'])   
}

function copiarHTML(){
    return src('public/**/*').pipe(dest('dist'))
}

function gerarJS(){
   return browserrify({
       basedir: '.', 
       entries: ['src/main.ts']
   })
    .plugin(tsify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(dest('dist'))
}

function gerarJSProducao() {
    return src('dist/app.js')
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(dest('dist'))
}

exports.default = series(
    limpaDist,
    parallel(gerarJS, copiarHTML),
    gerarJSProducao
)