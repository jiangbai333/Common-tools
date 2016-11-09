/**
 * 姜柏超 
 * jiangbai333@gmail.com
 */
`use strict`

/**
 * 判断传入数据类型
 * typeOf({})  'object'
 * typeOf([])           === 'array'
 * typeOf('')           === 'string'
 * typeOf(.1)           === 'number'
 * typeOf(false)        === 'boolean'
 * typeOf(null)         === 'null'
 * typeOf()             === 'undefined'
 * typeOf(undefined)    === 'undefined'
 * typeOf(/x/)          === 'regexp'
 * typeOf(function(){}) === 'function'
 * typeOf(Symbol())     === 'symbol'
 * typeOf(Symbol())     === 'symbol'
 */
function typeOf(obj) {
	return Object.prototype.toString.call(obj).match(/^\[.* (.*)\]$/)[1].toLowerCase();
}