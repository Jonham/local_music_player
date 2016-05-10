var playList = function(oPaths) {
    var aFolderList = [];
    var aSonglist = [];
    oPaths.forEach(function(value, index, collection) {
        aFolderList.push(value.name);

        // create a list that contains only workable (subfix mp3) song path
        var list = value.songList();

    });

}
