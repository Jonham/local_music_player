var listurl = "./songs.list";
var a = []; // for test
var debug = [];

jhget(listurl, function(result) {
    console.log('success');
    a = parseString(result);
});
