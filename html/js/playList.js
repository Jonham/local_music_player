var playList = function(oPaths) {
    var aFolderList = [];
    var aMusicFolder = [];  // store all the music on music folder

    oPaths.forEach(function(value, index, collection) {
        var sSubFolderName = value.name;
        aFolderList.push(sSubFolderName);

        // create a list that contains only workable (subfix mp3) song path
        var list = value.songList();
        aMusicFolder.push({
            list: list,
            name: sSubFolderName,
            path: value.path
        });
    });

}
