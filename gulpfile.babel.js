// =========================================== GULP =========================================== //
import gulp from 'gulp';
const sass = require('gulp-sass')(require('sass'));
import imagemin from 'gulp-imagemin';
import fs from 'fs';
import path from 'path';
import { src, dest, watch, parallel, series } from 'gulp';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import svgstore from 'gulp-svgstore';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify-es';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import clean from 'gulp-clean';
import avif from 'gulp-avif';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import rename from 'gulp-rename';
import include from 'gulp-include';
import ghPages from 'gulp-gh-pages';

const { writeFile, readdirSync } = fs;

// =========================================== HTML =========================================== //
const pages = () => {
  return src('app/pages/*.html')
    .pipe(include({
      includePaths: 'app/components'
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream());
};

// =========================================== FONTS =========================================== //
const fonts = () => {
  const fontImports = {};
  return src('app/fonts/src/*.ttf')
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src('app/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'))
    .on('end', () => {
      const fontFiles = readdirSync('app/fonts').filter(file => {
        const extension = path.extname(file).toLowerCase();
        return extension === '.woff2';
      });
      fontFiles.forEach(fontFile => {
        const fontName = path.basename(fontFile, path.extname(fontFile));
        const [baseFontName, fontStyle] = fontName.split('-');
        let fontWeight = '400';
        if (fontStyle) {
          if (fontStyle.includes('Thin')) {
            fontWeight = '100';
          } else if (fontStyle.includes('ExtraLight') || fontStyle.includes('UltraLight')) {
            fontWeight = '200';
          } else if (fontStyle.includes('Light')) {
            fontWeight = '300';
          } else if (fontStyle.includes('Medium')) {
            fontWeight = '500';
          } else if (fontStyle.includes('SemiBold') || fontStyle.includes('DemiBold')) {
            fontWeight = '600';
          } else if (fontStyle.includes('Bold')) {
            fontWeight = '700';
          } else if (fontStyle.includes('ExtraBold') || fontStyle.includes('UltraBold')) {
            fontWeight = '800';
          } else if (fontStyle.includes('Black') || fontStyle.includes('Heavy')) {
            fontWeight = '900';
          }
        }
        const importStatement = `@font-face {
          font-family: '${baseFontName}';
          font-style: normal;
          font-weight: ${fontWeight};
          src: url('../fonts/${fontName}.woff2') format('woff2'),
               url('../fonts/${fontName}.woff') format('woff');
        }`;
        if (!fontImports[baseFontName]) {
          fontImports[baseFontName] = [];
        }
        fontImports[baseFontName].push(importStatement);
      });
      const importStatements = Object.values(fontImports).flat();
      writeFile('app/scss/fonts/_fonts.scss', importStatements.join('\n'), (error) => {
        if (error) {
          throw error;
        }
      });
    });
};

// =========================================== IMAGES =========================================== //
const images = () => {
  return src(['app/images/src/*.*', '!app/images/src/*.svg'])
    .pipe(newer('app/images'))
    .pipe(avif({ quality: 85 }))
    .pipe(src(['app/images/src/*.*', '!app/images/src/*.svg']))
    .pipe(newer('app/images/dist'))
    .pipe(webp())
    .pipe(src(['app/images/src/*.*', '!app/images/src/*.svg']))
    .pipe(newer('app/images'))
    .pipe(imagemin())
    .pipe(dest('app/images'));
};

// =========================================== SVG =========================================== //
const sprite = () => {
  return src('app/images/src/*.svg')
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('icons.svg'))
    .pipe(dest('app/images'));
};
// =========================================== JS scripts =========================================== //
const scripts = () => {
  return src([
    'node_modules/swiper/swiper-bundle.min.js',
    'app/js/*.js',
    'app/js/main.js',
    '!app/js/main.min.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
};
// =========================================== CSS =========================================== //
const styles = () => {
  return src('app/scss/style.scss')
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
    .pipe(concat('style.css'))
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(dest('app/css'))
    .pipe(concat('style.min.css'))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
};
// =========================================== WATCH =========================================== //
const watching = () => {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
  watch(['app/scss/style.scss', 'app/scss/**/*.scss'], styles);
  watch(['app/images/src'], images);
  watch(['app/js/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/components/*', 'app/pages/*'], pages);
  watch(['app/*.html']).on('change', browserSync.reload);
};
// =========================================== BUILD =========================================== //
const cleanDist = () => {
  return src('dist').pipe(clean());
};
const building = () => {
  return src([
    'app/css/style.min.css',
    'app/images/*.*',
    '!app/images/stack',
    'app/images/icons.svg',
    'app/fonts/*.*',
    'app/js/main.min.js',
    'app/*.html',
    'app/nft/*.*'
  ], { base: 'app' }).pipe(dest('dist'));
};
// =========================================== DEPLOY gh-pages =========================================== //
const deploy = () => {
  return src('./dist/**/*').pipe(ghPages());
};

exports.styles = styles;
exports.images = images;
exports.fonts = fonts;
exports.pages = pages;
exports.building = building;
exports.sprite = sprite;
exports.scripts = scripts;
exports.watching = watching;
exports.deploy = deploy;

exports.build = series(cleanDist, building);
exports.default = parallel(images, sprite, styles, scripts, pages, watching);
