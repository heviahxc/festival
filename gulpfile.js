const { src, dest, watch, parallel} = require("gulp");
//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcermaps = require('gulp-sourcemaps');
//imagenes
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const avif = require('gulp-avif');

//JavaScript

const terser = require('gulp-terser-js');



function css ( done ){

    src('src/scss/**/*.scss')
        .pipe(sourcermaps.init())
        .pipe( plumber() ) // Identifica el archivo SASS
        .pipe( sass() )
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcermaps.write('.'))            // Compilar
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

function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcermaps.init())
        .pipe(terser())
        .pipe(sourcermaps.write('.'))
        .pipe(dest('build/js'));

    done();
}    

function dev ( done ){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}

exports.css = css; 
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);  