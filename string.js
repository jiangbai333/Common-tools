/**
 *    String 扩展库
 * @author jiangbai333
 * jiangbai333@gmail.com
 */
`use strict`

String.prototype.format = function(param) {
    var type = typeof param,
        date;
    
    if ( "number" === type ) {
        date = new Date(+new Date + param * 60 * 60 * 1000)
    } else {
        date = new Date(parseInt(param.replace(/^((start)|(end)|(-?\d*month)|(-?\d*year))$/i, function($0, $1, $2, $3, $4, $5) {
            var temp = new Date();
            if ( $2 ) {
                temp.setHours(0), temp.setMinutes(0), temp.setSeconds(0), temp.setMilliseconds(0);
            } else if ( $3 ) {
                temp.setHours(23), temp.setMinutes(59), temp.setSeconds(59), temp.setMilliseconds(999);
            } else if ( $4 ) {
                var num = parseInt($4);
                temp.setMonth(temp.getMonth() + num);
            } else if ( $5 ) {
                var num = parseInt($5);
                temp.setFullYear(temp.getFullYear() + num);
            }
            
            return +temp;
        })));
    }
    
    if ( this === "timestamp" ) {
        return +date;
    } else {
        var tmp = {
            "Y" : date.getFullYear(),
            "y" : date.getFullYear() - 2000,
            "M" : (function(M) {return M < 10 ? "0" + M : M;})(date.getMonth() + 1),
            "m" : date.getMonth() + 1,
            "D" : (function(D) {return D < 10 ? "0" + D : D;})(date.getDate()),
            "d" : date.getDate(),
            "H" : (function(H) {return H < 10 ? "0" + H : H;})(date.getHours()),
            "h" : date.getHours(),
            "F" : (function(F) {return F < 10 ? "0" + F : F;})(date.getMinutes()),
            "f" : date.getMinutes(),
            "S" : (function(S) {return S < 10 ? "0" + S : S;})(date.getSeconds()),
            "s" : date.getSeconds(),
            "ms": date.getMilliseconds()
        };
    }
    console.log(date)
}

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
        });
    })
}