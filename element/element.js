ele.prototype.bindEvent = function(type, handle) {
    var _this = this;
    if ( Object.prototype.toString.call(type).match(/^\[.* (.*)\]$/)[1].toLowerCase() === "array" ) {
        type.forEach(function(val) {
            _this.addEventListener(val.type, val.handle);
        });
    } else {
        this.addEventListener(type, handle);
    }
};

ele.prototype.delegateEvent = function(type, tag, handle) {
    var _this = this;
    if ( Object.prototype.toString.call(type).match(/^\[.* (.*)\]$/)[1].toLowerCase() === "array" ) {
        type.forEach(function(val) {
            _this.addEventListener(val.type, function(e) {
                var e = e || win.event;
                var target = e.target || e.srcElement;
                if(target.nodeName.toLowerCase() === val.tag){
                    val.handle.call(target, e);
                }
            });
        });
    } else {
        this.addEventListener(type, function(e) {
            var e = e || win.event;
            var target = e.target || e.srcElement;
            if(target.nodeName.toLowerCase() === tag){
                handle.call(target, e);
            }
        });
    }
};