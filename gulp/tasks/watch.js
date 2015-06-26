/**
 * Gulp - Watch
 * -----------------
 */

//watch for sass/js changes and run appropriate tasks
var config = require('../config');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var util = require('gulp-util');
var gulpif = require('gulp-if');
var fs = require('fs');
var prompt = require('gulp-prompt');
var needsPrompt = false;
var filename = 'gulp/.vhost';
var sassGraph = require('sass-graph');
var libsass = require('gulp-sass');
var crypto = require('crypto');
var sass = require('gulp-ruby-sass');
var notify = require('gulp-notify');

function _watchFiles() {

    //build sass graph given all the files we have in our project - must re-run when adding files
    config.graph = sassGraph.parseDir(config.paths.src + '/scss/pages');

    gulp.watch(config.paths.src + '/scss/**/*.scss').on('change', function(file){

        var loadPaths = config.graph.loadPaths;
        var imports = config.graph.index[file.path].importedBy;

        for(var i in imports){

            //what is the sub-path that this file has been loaded from?
            //we'll need it later
            var subPath = imports[i].split(loadPaths + "/"+ config.paths.src + "/scss/")[1];
            subPath = subPath.substr(0, subPath.lastIndexOf("/") + 1);

            gulp.src(imports[i])
                .pipe(libsass({
                    //style: 'compressed',
                    sourcemap: false,
                    loadPath: loadPaths,
                    includePaths: [config.paths.src + "/scss"],
                    container: "sass-graph-container"
                }))
                .on('error', notify.onError({
                    title: 'watch.js caught a scss build error.',
                    message: '<%= error.message %> I believe in you!'
                }))
                .pipe(gulp.dest(config.paths.dist + '/css/' + subPath)); //see, we used the subPath
        };
    });

    gulp.watch(config.paths.src + '/js/**/*.js', ['browserify']);

    gulp.watch(config.paths.images + '/icons/*.svg', ['icons']);

    gulp.watch([
            config.paths.dist + '/css/**/*.css'
        ])
        .on('change', function(file) {
            gulp.src(file.path)
                .pipe(reload({
                    stream: true
                }));
        });

    gulp.watch([
            config.paths.dist + '/js/**/*.js',
            config.paths.fonts + '/icons/*.woff',
            config.paths.documentRoot + '/*.html'
        ])
        .on('change', reload);
}

function _startBrowserSync() {
    //read vhost file here
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;

        //start a browsersync session using the data of gulp/.vhost
        browserSync({
            proxy: data
        });
    });
}

module.exports = function() {
    //does our vhost exist
    //check if gulp/.vhost has been created
    fs.exists(filename, function(exists) {
        if (!exists) {
            //prompt
            needsPrompt = true;
            gulp.src('gulpfile.js')
                .pipe(prompt.prompt({
                    name: 'vhost',
                    message: 'Please enter your vhost name'
                }, function(res) {
                    fs.writeFile(filename, res.vhost);
                    console.log('Virtual Host Set: ' + res.vhost);
                    _startBrowserSync();
                    _watchFiles();
                }));
        } else {
            _startBrowserSync();
            _watchFiles();
        }
    });

};
