var gulp = require('gulp-param')(require('gulp'), process.argv);
var gulpEjs = require('gulp-ejs');
var rename = require('gulp-rename');
var _ = require('lodash');
let toCamelCase = function (hyphensStr) {
    return hyphensStr.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); })
};
gulp.task('gen-service',function (t) {
    t = t.split(',');
    _.each(t,function (i) {
        let camelTableName = toCamelCase(i);
        return gulp.src('code-templates/gen-service.template')
            .pipe(gulpEjs({
                tableName: camelTableName
            }))
            .pipe(rename(`${i.replace(/_/g,'-')}-svr.js`))
            .pipe(gulp.dest('generated/service'));
    })
});
gulp.task('gen-service-index',function (t) {
    t = t.split(',');
    let params = _.map(t,function (i) {
        return {
            serviceName:toCamelCase(i),
            fileName:`${i.replace(/_/g,'-')}-svr`,
            serviceNameUpper:toCamelCase(i).replace(/(^[a-z])/,(g)=>g.toUpperCase())
        }
    });
    gulp.src('code-templates/gen-service-index.template')
        .pipe(gulpEjs({
            files: params
        }))
        .pipe(rename(`index.js`))
        .pipe(gulp.dest('generated/service'));
});