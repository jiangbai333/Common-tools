/**
 * 姜柏超 
 * jiangbai333@gmail.com
 */
`use strict`

/**
 * 判断传入数据类型
 * @param obj mixed
 * @return String
 * 	typeOf({}) => 'object'
 * 	typeOf([]) => 'array'
 * 	typeOf('') => 'string'
 * 	typeOf(.1) => 'number'
 * 	typeOf(/x/) => 'regexp'
 * 	typeOf(null) => 'null'
 * 	typeOf() => 'undefined'
 * 	typeOf(undefined) => 'undefined'
 * 	typeOf(false) => 'boolean'
 * 	typeOf(Symbol()) => 'symbol'
 * 	typeOf(Symbol()) => 'symbol'
 * 	typeOf(function(){}) =. 'function'
 */
function typeOf(obj) {
	return Object.prototype.toString.call(obj).match(/^\[.* (.*)\]$/)[1].toLowerCase();
}

/**
 * 返回当前时间戳
 * return int
 */
function getTimestamp() {
	return +new Date();
}