# TotallyStatical site generator

A barebone static site generator / rapid prototyping tool leveraging the awesome powers of Gulp and Webpack for all the heavy lifting.

## Requirements:

* [Node]( https://nodejs.org/download/ )

## Installation:
* run `npm install` to install all node dependencies
* run `gulp` to install bower dependencies, build the app and start watching!
* run `gulp build:production` to create a production build

## Features:
* **Sass/CSS**:
  * Blazing fast Node Sass(libsass) parser
  * Sass Sourcemaps for development
  * CSS prefixing with [autoprefixer](https://github.com/postcss/autoprefixer)
  * CSS minifying with [cssnano](http://cssnano.co/)
* **Javascript**:
  * ES6 support with babel and webpack
  * Source maps
* **Templating**:
  * [Jade templating language](http://jade-lang.com/) with partials support
* **Development**:
  * File watching and livereloading synchronized across multiple browsers/devices with [BrowserSync](https://www.browsersync.io/)
  * Source maps
* **Deployment**:
  * Blazing fast FTP deploys with [vinyl-ftp](https://www.npmjs.com/package/vinyl-ftp)
  * SFTP deployment with [gulp-sftp](https://www.npmjs.com/package/vinyl-ftp)
* **Bower support**: Automatically check and install bower packages.
  * Includes the following Sass packages by default:
    * [Susy v2]( http://susy.oddbird.net/ )
    * [Normalize]( https://github.com/JohnAlbin/normalize-scss )
    * [Breakpoint]( http://breakpoint-sass.com/ )
* **Images**:
  * Image minifying with imagemin
  * Compiles SVG sprites from all SVG files in the `assets/sprite` directory
  * Easy Jade mixin to create `<use>` code for SVG sprite icons
* **Revisioning / cache busting**:
  Cache busting static assets for production with [gulp-rev](https://github.com/sindresorhus/gulp-rev)

## Usage
Clone this package to a local folder and run `npm install` to install all the node dependencies.

### Development mode
To start developing, run `gulp` from the terminal. This default command will build all your assets in development mode, starts the watch command and a browsersync server which is available on `127.0.0.1:3000`.

### Production
Run `gulp build:production` to build your production app. This will build and minify your assets into the `/app/build` folder. This will also add a hash to your assets for cachebusting purposes.

### Deployment
Run either `gulp deloy:ftp` or `gulp deply:sftp` to deploy through FTP or SFTP. To configure, create a `.ftppass.json` file in the root of your project(see `.ftppass-example`)  and fill in the right details. In either `/gulpfile.js/tasks/deployFTP` or `/gulpfile.js/tasks/deploySFTP`, rename the line `var ftppass = require('../../.ftppass-example')` to `var ftppass 			= require('../../.ftppass')` and deploy like the wind.

## Tasks
All tasks are defined in `gulpfile.js/tasks`. Most tasks have a corresponding config file in `gulpfile.js/config`. Some share a config file and some just use `gulpfile.js/index.js`

### default
Cleans, builds app and enables watch tasks

### build:production
Builds app with minified assets. Runs the following tasks:
* [`clean`](#clean)
* [`bower`](#bower)
* [`images`](#images)
* [`styles:production`](#stylesproduction)
* [`scripts:standalone`](#scriptsstandalone)
* [`scripts:production`](#scripts)
* [`templates`](#templates)

### watch

Run `gulp watch` to start webserver, watch files and livereload with browsersync. Uses the `gulp-watch` plugin to correctly handle new files while watching.

Runs the tasks:
* [`browsersync`](#browsersync)
* [`setwatch`](#setwatch)
* [`templates`](#templates)

Uses:
* `gulp-watch`

### clean
Deletes entire build folder.

Plugins:
* `del` plugin

### bower
Checks if bower dependencies specified in the `bower.json` file are installed, and if not, installs them.

Plugins:
* `gulp-bower`

### images
Minifies images and distributes them to the build asset folder

Plugins:
* `gulp-images`
* `gulp-changed`

### svg:sprites
Create a SVG sprite from icons in the configured folder

Plugins:
* `gulp-images`
* `gulp-svgstore`

### scripts
Concatenates, uglifies and distributes `.js` files to build folder.
* `gulp-concat`
* `gulp-rename`
* `gulp-uglify`
* `gulp-if`

### scripts:standalone
Distributes standalone scripts to the build folder. Use for modernizr or other scripts that should be included standalone.

Plugins:
* `gulp-changed`

### styles
Compile `/sass` folder to css, autoprefix and add sourcemaps for debugging. In the corresponding config file it's possible to define bower packages with `includePaths` to easily define them with `@imports` in your .scss file. By default, the following paths are added"

* `./bower_components/normalize-scss/`
* `./bower_components/susy/sass/`
* `./bower_components/compass-breakpoint/stylesheets/`

Images should be added with the following path: `../../assets/img/test.jpg` due to some unfixed misconfiguration with the rev'ing (see Bugs and Todo's)

Plugins:
* `gulp-sass`
* `gulp-sourcemaps`
* `gulp-autoprefixer`
* `gulp-if`


### styles:production
Compile `/sass` to css and autoprefix. Doesn't minify as the css files will be rev'ed and minified after compilation.

Plugins:
* `gulp-sass`
* `gulp-autoprefixer`
* `gulp-rename`

### templates
Generates html files from jade template. Every jade template prefixed with an underscore will not be built into a html file. To speed up the templating process `gulp-jade-inheritance` is used to check which template is dependent on which partial.

Plugins:
* `gulp-jade`
* `gulp-jade-inheritance`
* `gulp-changed`
* `gulp-if`
* `gulp-filter`

### browsersync
Start browsersync server

Plugins:
* `browser-sync`

### setwatch
Sets a global `isWatching` variable to `true`. Use to execute certain tasks, functions or configurations only when `gulp watch` is running.

## Bugs and to-do's

* Fix reference to background images / revisioned assets
* Add a build task without any revisioning / cache busting.

## Changelog

### v1.1.0
**24/01/2016**
* Replaced `gulp-minify-css` with `gulp-cssnano`
* Added a `gulp deploy:ftp` and `gulp deploy:sftp` task

## Credits
Much credit goes out to the [gulp-starter repo](https://github.com/vigetlabs/gulp-starter) from Viget Labs(https://github.com/vigetlabs/).

## Licensing
Copyright (c) 2015 - 2016 Arden de Raaij. Licensed under the [MIT license(MIT)](https://opensource.org/licenses/MIT)
