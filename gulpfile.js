const gulp = require('gulp');
const pug = require('gulp-pug');
const del = require('del');
const browserSync = require('browser-sync').create();

// svg 
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

const config = {
    mode: {
        symbol: {
            sprite: "../sprite.svg",
        }
    }
};

// стили 
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const spritesmith = require('gulp.spritesmith');

// scripts
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

// пути 
const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug',
        dest: 'build/'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/css/'
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/img/'
    },
    icons: {
        src: 'src/images/icons/*.png',
        source: 'src/images/icons/*.svg',
        dest: 'build/img/icons/'
    },
    fonts: {
        src: 'src/fonts/**/*.*',
        dest: 'build/fonts/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/js/'
    }
}

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
    return gulp.src('./src/styles/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
}

// очистка
function clean() {
    return del(paths.root);
}

// webpack 
function scripts() {
    return gulp.src('src/scripts/app.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}

// отслеживаем исходники src
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}

// отслеживаем build и перезагружаем браузер
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// перенос картинок
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

// делаем спрайт из иконок png
function spritePng() {
    return gulp.src(paths.icons.src)
        .pipe(spritesmith({
            imgName: 'sprite.png',
            padding: 10,
            cssName: 'sprite.css'
        }))
        .pipe(gulp.dest(paths.icons.dest));
}

// делаем спрайт из иконок svg
function spriteSvg() {
    return gulp.src(paths.icons.source)
      // минифицируем svg
      .pipe(svgmin({
        js2svg: {
          pretty: true
        }
      }))
      // удалить все атрибуты fill, style and stroke в фигурах
      .pipe(cheerio({
        run: function($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        }
      }))
      // cheerio плагин заменит, если появилась, скобка '&gt;', на нормальную.
      .pipe(replace('&gt;', '>'))
      // build svg sprite
      .pipe(svgSprite(config))
      .pipe(gulp.dest(paths.icons.dest));
  }

// перенос шрифтов
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.spritePng = spritePng;
exports.spriteSvg = spriteSvg;
exports.fonts = fonts;
exports.scripts = scripts;

// работаем
gulp.task('default', gulp.series(
    gulp.parallel(templates, styles, scripts, fonts, images, spriteSvg),
    gulp.parallel(watch, server)
));

// контрольная сборка
gulp.task('build', gulp.series(
    clean,
    gulp.parallel(templates, styles, scripts, fonts, images, spriteSvg)
));