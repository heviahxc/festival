const { src, dest, watch} = require("gulp");
const sass = require('gulp-sass')(require('sass'));


function css ( done ){

    src('src/scss/app.scss') // Identifica el archivo SASS
    .pipe( sass() )            // Compilar
    .pipe( dest('build/css') );// Guarda en el disco duro


    done();
}

function dev ( done ){
    watch('src/scss/app.scss', css);

    done();
}

exports.css = css; 
exports.dev = dev;  