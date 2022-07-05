const { src, dest, watch, parallel} = require("gulp");
//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
//imagenes
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const avif = require('gulp-avif');


function css ( done ){

    src('src/scss/**/*.scss')
        .pipe( plumber() ) // Identifica el archivo SASS
        .pipe( sass() )            // Compilar
        .pipe( dest('build/css') );// Guarda en el disco duro


    done();
}

function versionWebp(done){

const options = {
    quality:50
};
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(options))
        .pipe(dest('build/img'));
    

    done();
}

function versionAvif(done){

    const options = {
        quality:50
    };
        src('src/img/**/*.{png,jpg}')
            .pipe(avif(options))
            .pipe(dest('build/img'));
        
    
        done();
    }

function imagenes(done){

    const options = {
        optimizationLevel: 3
    };
        src('src/img/**/*.{png,jpg}')
            .pipe(cache(imagemin(options)))
            .pipe(dest('build/img'));
        
    
        done();
    }

function dev ( done ){
    watch('src/scss/**/*.scss', css);

    done();
}

exports.css = css; 
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);  