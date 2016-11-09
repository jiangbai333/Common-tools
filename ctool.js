/**
 * ���س� 
 * jiangbai333@gmail.com
 */
`use strict`

/**
 * �жϴ�����������
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