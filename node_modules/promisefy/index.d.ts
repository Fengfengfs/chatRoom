declare module 'promisefy' {
	import stream = require('stream');
	export function fold<T>(x: Q.Promise<Q.Promise<T>>): Q.Promise<T>;
	export function fileExists(path: string): Q.Promise<boolean>;
	export function mkdirp(path: string): Q.Promise<string>;
	export function pipe(is: stream.Readable, os: stream.Writable): Q.Promise<number[]>;
	export function writeFile(filename: string, data: any, overwrite: boolean): Q.Promise<number[]>;
	export function readFile(filename: string): Q.Promise<NodeBuffer>;
}
