var jhdb = {};
var jhget = function(filepath, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', filepath, true);

    xhr.onerror = function(e) {
        console.error(e);
    };
    xhr.onload = function(e) {
        console.log(e.result);
        if(jhdb) { jhdb.onload = e; }
    };
    xhr.onreadystatechange = function(e) {
        console.log('readyState: ' + xhr.readyState);
        console.log('status: ' + xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("got response");
            if(jhdb) { jhdb.response = xhr.response; }

            if (callback && typeof(callback) === 'function') {
                callback(xhr.response);
            }
        }
    };

    xhr.send();
};
