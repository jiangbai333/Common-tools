//window.requestAnimationFrame(drawFrame);

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||   
                                    window.mozRequestAnimationFrame || 
                                    window.msRequestAnimationFrame ||
                                    window.oRequestAnimationFrame ||
                                    function (callback) {
                                        return window.setTimeout(callback, 17 /*~ 1000/60*/);
                                    });
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
                                   window.webkitCancelAnimationFrame || 
                                   window.webkitCancelRequestAnimationFrame ||
                                   window.mozCancelAnimationFrame || 
                                   window.mozCancelRequestAnimationFrame ||
                                   window.msCancelAnimationFrame || 
                                   window.msCancelRequestAnimationFrame ||
                                   window.oCancelAnimationFrame || 
                                   window.oCancelRequestAnimationFrame ||
                                   window.clearTimeout);
}

window.cRAM = {};

function controller(cName = "c" + +new Date()) {
    this.id = "c" + +new Date();
    window.cRAM[cName] = this;
    this._views = [];
    this.views = [];
    this.model = undefined;
}

controller.prototype.query = function(selector = "body") {
    this._views = document.querySelectorAll(selector);
    this.views = [...this._views];
    return this;
}

controller.prototype.M = function({
    type = "GET",
    url = undefined,
    data = {},
}) {
    var _this = this;
    try {
        if (url === undefined) {
            throw "You must give an url";
        } else {
            this.model = new model();

            (function req(context) {
                window.setTimeout(req, 1000);
                _this.model.ajax({
                    type : type,
	                url : url,
	                data : data,
	                success : function(d) {
		                for (let o in d) {
                            _this.views.forEach(function (value) {
                                var tempBand = [...value.querySelectorAll("[band='" + o + "']")];
                                tempBand.forEach(function(value) {
                                    value.innerHTML = d[o];
                                });
                            });
                        }
	                }
                })
            })(this);
        }
    } catch(e) {
        console.log(e);
    }

    return this;
}

controller.prototype.band = function(callback) {
    var models = {};
    this.views.forEach(function(d, i) {
        console.log(d, i);    
    });
    callback.call(this, this.views);
}



function model() {
    this._response = undefined;
    this._responseText = "";
    this._responseDate = undefined; 
}

model.prototype.getResponseText = function() {
    return this._responseText;
}

model.prototype.getResponseData = function() {
    return this._responseDate;
}

model.prototype._ajaxSuccessCallback = function (data) {
    console.log("未指定回调函数, 此次请求结果为:" + this._responseText);
	
} 

model.prototype._ajaxFailedCallback = function (data) {
    console.log(data);
}
 
model.prototype.ajax = function({
    type = "GET",
    url = undefined,
    data = {},
    success = this._ajaxSuccessCallback,
    failed = this._ajaxFailedCallback,
    dataType = "json"
}) {
    var xhr = null, _that = this;
    if ( window.XMLHttpRequest ) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
 
    var type = type.toUpperCase();
 
    if ( typeof data == 'object' ) {
        var str = '';
        for (var key in data) {
            str += key + '=' + data[key] + '&';
        }
        data = str.replace(/&$/, '');
    }
 
    if ( type == 'GET' ) {
        if ( data ) {
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url + '?t=' + Math.random(), true);
        }
        xhr.send();
 
    } else if ( type == 'POST' ) {
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    xhr.onreadystatechange = function(){
        if ( xhr.readyState == 4 ) {
            _that._response = xhr;
            if ( xhr.status == 200 ) {
                _that._responseText = xhr.responseText;
                _that._responseDate = JSON.parse(xhr.responseText);
                success.call(_that, dataType === "json" ? 
                    _that._responseDate : _that._responseText);
            } else {
                if ( failed ) {
                    failed.call(_that, xhr);
                }
            }
        }
    }

    return _that;
}
