
var __hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { 
    for (var key in parent) { 
        if (__hasProp.call(parent, key)) {
            child[key] = parent[key]; 
        }
    } 
    function ctor() { 
        this.constructor = child; 
    } 
    ctor.prototype = parent.prototype; 
    child.prototype = new ctor(); 
    child.__super__ = parent.prototype; 
    return child; 
};

var Express = require('express');

/*
app.get('/', function(req, res){
  res.send('Hello World');
});


var server = app.listen(3040, function() {
    console.log('Listening on port %d', server.address().port);
});


*/
module.exports.FunServer = (function (_super){
    __extends(FunServer, _super);
    function FunServer() {
        FunServer.__super__.constructor.apply(this, arguments);
        console.log(this.get);

        //return this.listen(3040 , this.onListen);
    }


    FunServer.prototype.onListen = function () {

    };



    

    return FunServer; 
})(Express);




var server = new module.exports.FunServer();

