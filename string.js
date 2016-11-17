/**
 *    String 扩展库
 * @author jiangbai333
 * jiangbai333@gmail.com
 */
`use strict`

String.prototype.engine = function($) {
    
    return (function(context, $, callback) {
        
        var tempType = Object.prototype.toString.call($).match(/^\[.* (.*)\]$/)[1].toLowerCase(),
        
            /** 模板变量键值类型：true{String},false{Object|Array...} */
            valueType = (function ($) {
                
                for (var o in $) {
                    
                    if ("object" === typeof $[o] || "array" === typeof $[o]) {
                        
                        return false;
                    }
                }
                
                return true;
            })($),
            
            reg = /(\\)?\{\$([^\{\}\\]+)?\}/g,
            
            rt = new Array();
            
        if ( "array" === tempType && !valueType) {
            
            for (var o in $) {
                
                rt.push(callback(context, $[o], reg));
            }
            
            rt = rt.toString().replace(/,/g, "");
        } else {
            
            rt = callback(context, $, reg);
        }
        
        return rt;
    })(this, $, function(c, t, r) {
        
        return c.replace(r, function($0, $1, $2, $3) {
            /** 如果以\\{$.*}作为占位符, 则不进行替换 */
            if ( $1 ) {
                
                return $0.replace('\\', '');
            } else {
                /** 按所属关系分割模板变量 */
                var $4 = $2.replace(/\s/g, '').split('.'),
                    $5 = t;
                
                /** 循环解析模板变量 */
                for ( var $6 in $4 ) {
                    
                    $5 = $5[$4[$6]];
                    
                    if ( $5 === undefined || $5 === null ) {
                        
                        return '';
                    }
                }

                return $5;
            }
        })
    })
}