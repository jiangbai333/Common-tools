/**
 *    String ��չ��
 * @author jiangbai333
 * jiangbai333@gmail.com
 */
`use strict`

/**
 *      ���ر���ʽ�������ڻ�ʱ���
 * @param param int|String "start"|"end"|"Nmonth"|"Nyear"(NΪ��������)
 * @return String|int
 * @example
 *  "Y��M��D�� H:F:S-ms".format("start"); //2016��11��22�� 00:00:00-0
 *  "Y-M-D H:F:S-ms".format("end"); //2016-11-22 23:59:59-999
 */
String.prototype.format = function(param) {
    var type = typeof param,
        reg = "^((start)|(end)|(-?\\d*month)|(-?\\d*year))$",
        date;
    
    if ( "number" === type ) {
        date = new Date(+new Date + param * 60 * 60 * 1000)
    } else if (new RegExp(reg, "i").test(param)) {
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
        }
        
        date = temp;
    } else {
        return this.valueOf();
    }
    
    if ( this === "timestamp" ) {
        return +date;
    } else {
        var dec = {
            "Y" : date.getFullYear(),
            "y" : date.getFullYear() - 2000,
            "M" : (function(M) {return M < 10 ? "0" + M : M;})(date.getMonth() + 1),
            //"m" : date.getMonth() + 1,
            "D" : (function(D) {return D < 10 ? "0" + D : D;})(date.getDate()),
            //"d" : date.getDate(),
            "H" : (function(H) {return H < 10 ? "0" + H : H;})(date.getHours()),
            //"h" : date.getHours(),
            "F" : (function(F) {return F < 10 ? "0" + F : F;})(date.getMinutes()),
            //"f" : date.getMinutes(),
            "S" : (function(S) {return S < 10 ? "0" + S : S;})(date.getSeconds()),
            //"s" : date.getSeconds(),
            "ms": date.getMilliseconds()
        };
        
        var str = this.valueOf();
        
        for ( var o in dec ) {
            if (new RegExp("(" + o + ")").test(str)) {
                str = str.replace(RegExp.$1, dec[o])
            }
        }
        date = str;
    }
    return date;
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