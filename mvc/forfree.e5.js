function controller() {
    this.id = "c" + +new Date();
    this._views = [];
    this.views = [];
}

controller.prototype.query = function(selector = "body") {
    this._views = document.querySelectorAll(selector);
    this.views = [...this._views];
    return this;
}





function model() {
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
	
	this._responseText = data;
	this._responseDate = JSON.parse(data);
	console.log("未指定回调函数, 此次请求结果为:" + this._responseText);
	
} 

model.prototype._ajaxFailedCallback = function (data) {
	console.log(this, data);
}
 
model.prototype.ajax = function({
	type = "GET",
	url =　undefined,
	data = {},
	success = this._ajaxSuccessCallback,
	failed = this._ajaxFailedCallback
}) {
	console.log(type, url, data, success, failed);
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
 
    var type = type.toUpperCase();
 
    if(typeof data == 'object'){
        var str = '';
        for(var key in data){
            str += key+'='+data[key]+'&';
        }
        data = str.replace(/&$/, '');
    }
 
    if(type == 'GET'){
        if(data){
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url + '?t=' + Math.random(), true);
        }
        xhr.send();
 
    } else if(type == 'POST'){
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success(xhr.responseText);
            } else {
                if(failed){
                    failed(xhr.status);
                }
            }
        }
    }
}
