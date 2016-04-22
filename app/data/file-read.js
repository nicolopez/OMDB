module.exports = fileReader;

/**
* fileReader
* Params: (string), the string represents a given directory
* Returns array
**/
function fileReader (path) {
    this.path = path;
    this.results = [];
}

/**
* Returns the file list of the given directory and subdirectories
**/
fileReader.prototype.loadFiles = function (dir) {
    var results = [];
    var self = this;
    var fs = require("fs");

    // find file and put them in an array recursively
    fs.readdirSync(dir).forEach(function(file) {
        file = (dir)+'/'+file;
        var stat = fs.statSync(file);
        // check if the file is a directory to search files in it
        if (stat && stat.isDirectory()) {
            results = results.concat(self.loadFiles(file))
        } else results.push(file);
    });
    return results;
};

/**
* Get the files from a given directory, in case the caller doesn't pass a path
* it uses a default path stored in this.path
**/
fileReader.prototype.getFiles = function (dir, noCache) {
    var p = dir || this.path;
    var refreshFlag = dir !== this.path;
    var results;
    // Check if the user passes a new directory to look for
    if(refreshFlag) {
        // Always cache the new directory on this.path unless the caller passes the
        // paran as true
        if(!noCache) {
            this.path = p;
        }
        results = this.loadFiles(p);
    } else {
        results = this.results.length ? this.results : this.loadFiles(p);
    }
    // Overwrite the old list with the new one
    this.results = results;
    return this.results;
};
