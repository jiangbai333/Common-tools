/**
 *    String ��չ��
 * @author jiangbai333
 * jiangbai333@gmail.com
 */
`use strict`

/**
 *      url �⹹����
 */
String.prototype.url = function() {
    location.query = (function (param) {
        var temp = {};

        if (param.indexOf("?") != -1) {
            var queryString = param.substr(1);
            querys = queryString.split("&");
            for(var i = 0; i < querys.length; i ++) {
                temp[querys[i].split("=")[0]]=decodeURI(querys[i].split("=")[1]);
            }
        }

        return temp;
    })(location.search)
    
    return (typeof location[this.valueOf()] === "function") ? (location[this.valueOf()])() : location[this.valueOf()];
}

/**
 *      ���ر���ʽ�������ڻ�ʱ���
 * @param param int|String "start"|"end"|"Nmonth"|"Nyear"(NΪ��������)
 * @return String|int
 */
String.prototype.format = function(param) {
    var type = typeof param,
        reg = "^((start)|(end)|(-?\\d*month)|(-?\\d*year)|(-?\\d{1,9})|(\\d{10})|(\\d{13}))$",
        date;
    
    if (new RegExp(reg, "i").test(param)) {
        var temp = new Date();
        if ( RegExp.$2 ) {
            temp.setHours(0), temp.setMinutes(0), temp.setSeconds(0), temp.setMilliseconds(0);
        } else if ( RegExp.$3 ) {
            temp.setHours(23), temp.setMinutes(59), temp.setSeconds(59), temp.setMilliseconds(999);
        } else if ( RegExp.$4 ) {
            var num = parseInt(RegExp.$4);
            temp.setMonth(temp.getMonth() + num);
        } else if ( RegExp.$5 ) {
            var num = parseInt(RegExp.$5);
            temp.setFullYear(temp.getFullYear() + num);
        } else if ( RegExp.$6 ) {
            var num = parseInt(RegExp.$6);
            temp = new Date(+new Date + num * 60 * 60 * 1000);
        } else if ( RegExp.$7 ) {
            var num = parseInt(RegExp.$7) * 1000;
            temp = new Date(num);
        } else if ( RegExp.$8 ) {
            var num = parseInt(RegExp.$8);
            temp = new Date(num);
        } else {
            //
        }
        date = temp;
    } else {
        date = new Date();
    }
    
    var dec = {
        "Y" : date.getFullYear(),
        "y" : date.getFullYear() - 2000,
        "M" : (function(M) {return M < 10 ? "0" + M : M;})(date.getMonth() + 1),
        "D" : (function(D) {return D < 10 ? "0" + D : D;})(date.getDate()),
        "H" : (function(H) {return H < 10 ? "0" + H : H;})(date.getHours()),
        "F" : (function(F) {return F < 10 ? "0" + F : F;})(date.getMinutes()),
        "S" : (function(S) {return S < 10 ? "0" + S : S;})(date.getSeconds()),
        "ms": date.getMilliseconds(),
        "long-stamp" : +date,
        "short-stamp" : 0 | date / 1000
    };
    
    var str = this.valueOf();
    
    for ( var o in dec ) {
        if (new RegExp("(" + o + ")").test(str)) {
            str = str.replace(RegExp.$1, dec[o])
        }
    }
    
    return str;
}

String.prototype.engine = function($) {
    
    return (function(context, $, callback) {
        /** �жϲ������� */
        var tempType = Object.prototype.toString.call($).match(/^\[.* (.*)\]$/)[1].toLowerCase(),
        
            /** ģ�������ֵ���ͣ�true{String},false{Object|Array...} */
            valueType = (function ($) {
                for (var o in $) {
                    if ("object" === typeof $[o] || "array" === typeof $[o]) {
                        return false;
                    }
                }
                return true;
            })($),
            /** ƥ��ģ����� */
            reg = /(\\)?\{\$([^\{\}\\]+)?\}/g, 
            rt = new Array();
        
        /** �������λ Array ���Ҽ�ֵΪ Array �� Object ��ѭ���滻ģ����� */
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
            /** �����\\{$.*}��Ϊռλ��, �򲻽����滻 */
            if ( $1 ) {
                return $0.replace('\\', '');
            } else {
                /** ��������ϵ�ָ�ģ����� */
                var $4 = $2.replace(/\s/g, '').split('.'),
                    $5 = t;
                /** ѭ������ģ����� */
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

String.prototype.query = function (selector) {
    var _DOM = this.valueOf();

    var _div = document.createElement("div");
    _div.innerHTML = _DOM;
    return _div.querySelectorAll(selector);
}
