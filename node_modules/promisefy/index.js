// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
///<reference path="../typed/node/node.d.ts" />
///<reference path="../typed/q/Q.d.ts" />
var Q = require('q');

var fs = require('fs');

var mkdirpCb = require('mkdirp');

function fold(x) {
    return x;
}
exports.fold = fold;

function fileExists(path) {
    var deferred = Q.defer();
    fs.exists(path, function (exists) {
        if (exists) {
            fs.stat(path, function (err, stats) {
                deferred.resolve(stats.isFile());
            });
        } else
            deferred.resolve(false);
    });
    return deferred.promise;
}
exports.fileExists = fileExists;

function mkdirp(path) {
    var deferred = Q.defer();
    mkdirpCb(path, function (err) {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(path);
    });
    return deferred.promise;
}
exports.mkdirp = mkdirp;

function pipe(is, os) {
    var time = process.hrtime(), deferred = Q.defer();
    is.on('error', function (err) {
        return deferred.reject(err);
    });
    is.on('end', function () {
        return os.end();
    });
    os.on('error', function (err) {
        return deferred.reject(err);
    });
    os.on('finish', function () {
        return deferred.resolve(process.hrtime(time));
    });
    if (is.resume && is['paused']) {
        is['paused'] = false;
        is.resume();
    }
    is.pipe(os, { end: false });
    return deferred.promise;
}
exports.pipe = pipe;

function writeFile(filename, data, overwrite) {
    var time = process.hrtime(), deferred = Q.defer();
    fs.writeFile(filename, data, {
        flag: overwrite ? 'w' : 'wx'
    }, function (err) {
        if (err)
            return deferred.reject(err);
        deferred.resolve(process.hrtime(time));
    });
    return deferred.promise;
}
exports.writeFile = writeFile;

function readFile(filename) {
    var time = process.hrtime();
    var deferred = Q.defer();
    fs.readFile(filename, function (err, data) {
        if (err)
            return deferred.reject(err);
        deferred.resolve(data);
    });
    return deferred.promise;
}
exports.readFile = readFile;
