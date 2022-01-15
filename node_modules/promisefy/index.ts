// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../typed/node/node.d.ts" />
///<reference path="../typed/q/Q.d.ts" />

import Q = require('q')
import stream = require('stream')
import fs = require('fs')

var mkdirpCb = require('mkdirp')

export function fold<T>(x: Q.Promise<Q.Promise<T>>): Q.Promise<T> {
    return <any> x
}

export function fileExists(path: string): Q.Promise<boolean> {
    var deferred: Q.Deferred<boolean> = Q.defer<boolean>()
    fs.exists(path, exists => {
        if (exists) {
            fs.stat(path, (err, stats) => {
                deferred.resolve(stats.isFile())
            })
        }
        else
            deferred.resolve(false)
    })
    return deferred.promise
}

export function mkdirp(path: string): Q.Promise<string> {
    var deferred: Q.Deferred<any> = Q.defer()
    mkdirpCb(path, err => {
        if (err)
            deferred.reject(err)
        else
            deferred.resolve(path)
    })
    return deferred.promise
}

export function pipe(is: stream.Readable, os: stream.Writable): Q.Promise<number[]> {
    var time = process.hrtime()
        , deferred: Q.Deferred<number[]> = Q.defer<number[]>()
    is.on('error', err => deferred.reject(err))
    is.on('end', () => os.end())
    os.on('error', err => deferred.reject(err)) //Node.js v0.10 API doc does not mention error event for WritableStream, but source code does emit
    os.on('finish', () => deferred.resolve(process.hrtime(time)))
    if (is.resume && is['paused']) {
        is['paused'] = false
        is.resume()
    }
    is.pipe(os, { end: false })
    return deferred.promise
}

export function writeFile(filename: string, data: any, overwrite: boolean): Q.Promise<number[]> {
    var time = process.hrtime()
        , deferred: Q.Deferred<number[]> = Q.defer<number[]>()
    fs.writeFile(filename, data, {
        flag: overwrite ? 'w' : 'wx'
    }, err => {
        if (err)
            return deferred.reject(err)
        deferred.resolve(process.hrtime(time))
    })
    return deferred.promise
}

export function readFile(filename: string): Q.Promise<NodeBuffer> {
    var time = process.hrtime()
    var deferred: Q.Deferred<NodeBuffer> = Q.defer<NodeBuffer>()
    fs.readFile(filename, (err, data) => {
        if (err)
            return deferred.reject(err)
        deferred.resolve(data)
    })
    return deferred.promise
}