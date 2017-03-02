/**
 * Created by Administrator on 2017/2/26.
 */
var cxt = document.getElementById('board').getContext('2d');

var map = [];
for(var x = 0;x<=19;++x) {
    for(var y = 0;y<=19;++y) {
        var atom = {};
        atom.x = x;
        atom.y = y;
        map.push(atom);
    }
}

function block(x,y,color){
    cxt.fillStyle = color;
    cxt.fillRect(x*15,y*15,15,15);
    cxt.strokeStyle = '#150509';
    cxt.lineWidth = 1;
    cxt.strokeRect(x*15,y*15,15,15);
}

function fresh(){
    cxt.clearRect(0,0,150,300);
}
function textFresh(){
    cxt.clearRect(210,75,60,30);
    cxt.clearRect(210,150,75,15);
    cxt.clearRect(210,225,75,15);
}


function cloneObj(obj){
    if(typeof(obj) != 'object')
        return obj;
    if(obj == null)
        return obj;
    var newObj = new Object();

    for(var key in obj)
        newObj[key] = cloneObj(obj[key]);
    return newObj;
}

var deepCopy = function(o){
    if (o instanceof Array){
        var n = [];
        for(var i = 0;i<o.length;i++)
            n[i] = deepCopy(o[i]);
        return n;
    } else if (typeof o==='object'){
        var n = {};
        for(var i in o)
            n[i] = deepCopy(o[i]);
        return n;
    } else {
        return o;
    }
}

var deepCopy2 = function(source)
{
    var result;
    (source instanceof Array) ? (result = []) : (result = {});

    for (var key in source) {
        result[key] = (typeof source[key]==='object') ? deepCopy(source[key]) : source[key];
    }
    return result;
}
