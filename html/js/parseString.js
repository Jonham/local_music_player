var parseString = function(str) {
    var aString = str.split("\n");

    // any path show like  ^path:$
    var isPath = function(str) { // return ['longstring', 'path like /a/b']
        var reg = /^\.(.*):$/;
        return str.match(reg);
    };
    var isEmpty = function(str){ return str === ""; };
    var isMedia = function(str) { // return ['longstring', 'name', 'subfix']
        var reg = /(.+)\.(.+)$/;
        return str.match(reg);
    };

    /* oTree
     * addSong(aSong) require an array by split a song string
     * addPath(aPath) require an array by split a path string
    */
    var ProtoTree = function() {
        var tree = [];
        var curList = [];
        var curPath = "";
        var curName = "";
        var Path = function(name, list, path) {
            if (this === window) { return new Path(name, list, path); }
            this.name = name;
            this.list = list;
            this.path = path;

            return this;
        };
        Path.prototype = {
            songList : function() {
                var songPathList = [];
                var that = this;
                var list = that.list.map(function(value, index, self) {
                    if (value.subfix === 'mp3') {
                        return '.' + that.path +'/' +value.name;
                    }
                });
                return list.filter(function(value) {
                    return typeof(value) === 'string';
                });
            }
        };
        this.addSong = function(aSong) {
            curList.push(aSong);
        };
        this.addPath = function(aPath) {
            curList = [];
            curPath = aPath[1]; // a contains array from isPath
            curName = curPath.substr(curPath.lastIndexOf('/') + 1);
            if (curPath !== "") {
                // add last path and list into tree
                tree.push(new Path(curName, curList, curPath));
            } else {
                // curPath === ''  means root path
                tree.push(new Path(curName, curList, curPath));
            }
        };
        this.tree = tree;

        return this;
    };
    var oTree = new ProtoTree();
    aString.forEach(function(value, index, self) {
        var p = isPath(value);
        if (p) { // value is a path
            oTree.addPath(p);
        }
        else { // test whether is a media
            var m = isMedia(value);
            if (m) {
                oTree.addSong({
                    title: m[1],
                    subfix: m[2],
                    name: m[0]
                });
            } else {
                if (Array.isArray(debug) ) {
                    debug.push(value + ' >>> at line ' + index);
                } else {
                    var a = [];
                    a.push(debug);
                    debug = a;
                }

            }
        }
    });
    return oTree;
}
