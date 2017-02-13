if ( !Object.entries ) {
    Object.entries = function(obj) {
        var entrys = [];
        for (var key in obj) {
            entrys.push([key, obj[key]]);
        }
        return entrys;
    }
}
