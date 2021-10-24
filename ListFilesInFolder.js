var fs = require('fs');
var path = '../helloworl/'
var files = fs.readdirSync(path);
files.forEach(function (f) {
    if (!f.includes(".gz")) {
        console.log(`${path}${f}`)
    }
});