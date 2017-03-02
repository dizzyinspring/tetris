/**
 * Created by Administrator on 2017/2/25.
 */
if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
    for(var i = 0;i<5;i++)
        document.getElementsByTagName('button')[i].style.webkitAppearance = 'none';
    for(i = 0;i<4;i++)
        document.getElementsByClassName('directbut')[i].removeAttribute('onclick');
    document.getElementById('score').style.margin = '-10px -webkit-calc(50% - 125px) 0px -webkit-calc(50% - 125px)';
    document.getElementById('score').style.float = 'none';
    document.getElementById('restart').style.display = 'inline-block';
    document.getElementById('restart').style.fontSize = '15px';
    document.getElementById('restart').style.width = '80px';
    document.getElementById('restart').style.verticalAlign = 'top';
    var deviceWidth = document.documentElement.clientWidth;
    var marginchar = '0px 0px 0px -webkit-calc('+deviceWidth+'px - 300px)';
    document.getElementById('buttondiv').style.margin = marginchar;

} else {
    for(i = 0;i<4;i++)
        document.getElementsByClassName('directbut')[i].style.display = 'none';
}

cxt.font = '15px arial';
cxt.fillText('Next',210,45);
cxt.fillText('Score',210,150);
cxt.fillText('Level',210,225);


var score = 0;
var level;
var lineRemoved = 0;
var state = 'g';
var tetrisAll = ['l','z','o','i','t','rl','rz'];
var tetrisType;
var lcolor = '#ff0000';
var zcolor = '#ff03e6';
var ocolor = '#0000ff';
var icolor = '#00ffff';
var tcolor = '#f0fe00';
var bcolor = '#150509';
var tetrisShape = [];
    tetrisShape['l'] = [
    {
        0:{x:4,y:0,color:lcolor},
        1:{x:5,y:0,color:lcolor},
        2:{x:6,y:0,color:lcolor},
        3:{x:6,y:-1,color:lcolor}
    },
    {
        0:{x:5,y:0,color:lcolor},
        1:{x:5,y:-1,color:lcolor},
        2:{x:5,y:1,color:lcolor},
        3:{x:4,y:-1,color:lcolor}
    },
    {
        0:{x:4,y:0,color:lcolor},
        1:{x:4,y:-1,color:lcolor},
        2:{x:5,y:-1,color:lcolor},
        3:{x:6,y:-1,color:lcolor}
    },
    {
        0:{x:4,y:0,color:lcolor},
        1:{x:4,y:-1,color:lcolor},
        2:{x:4,y:1,color:lcolor},
        3:{x:5,y:1,color:lcolor}
    }
];
tetrisShape['rl'] = [
    {
        0:{x:4,y:0,color:lcolor},
        1:{x:5,y:0,color:lcolor},
        2:{x:6,y:0,color:lcolor},
        3:{x:4,y:-1,color:lcolor}
    },
    {
        0:{x:4,y:0,color:lcolor},
        1:{x:4,y:-1,color:lcolor},
        2:{x:4,y:1,color:lcolor},
        3:{x:5,y:-1,color:lcolor}
    },
    {
        0:{x:6,y:0,color:lcolor},
        1:{x:4,y:-1,color:lcolor},
        2:{x:5,y:-1,color:lcolor},
        3:{x:6,y:-1,color:lcolor}
    },
    {
        0:{x:6,y:0,color:lcolor},
        1:{x:6,y:-1,color:lcolor},
        2:{x:6,y:1,color:lcolor},
        3:{x:5,y:1,color:lcolor}
    }
];
tetrisShape['z'] = [
    {
        0:{x:4,y:0,color:zcolor},
        1:{x:5,y:0,color:zcolor},
        2:{x:4,y:-1,color:zcolor},
        3:{x:3,y:-1,color:zcolor}
    },
    {
        0:{x:4,y:0,color:zcolor},
        1:{x:5,y:0,color:zcolor},
        2:{x:4,y:1,color:zcolor},
        3:{x:5,y:-1,color:zcolor}
    }
];
tetrisShape['rz'] = [
    {
        0:{x:4,y:0,color:zcolor},
        1:{x:5,y:0,color:zcolor},
        2:{x:5,y:-1,color:zcolor},
        3:{x:6,y:-1,color:zcolor}
    },
    {
        0:{x:4,y:0,color:zcolor},
        1:{x:5,y:0,color:zcolor},
        2:{x:4,y:-1,color:zcolor},
        3:{x:5,y:1,color:zcolor}
    }
];
tetrisShape['o'] = [
    {
        0:{x:4,y:0,color:ocolor},
        1:{x:5,y:0,color:ocolor},
        2:{x:4,y:-1,color:ocolor},
        3:{x:5,y:-1,color:ocolor}
    }
];
tetrisShape['i'] = [
    {
        0:{x:3,y:0,color:icolor},
        1:{x:4,y:0,color:icolor},
        2:{x:5,y:0,color:icolor},
        3:{x:6,y:0,color:icolor}
    },
    {
        0:{x:4,y:-1,color:icolor},
        1:{x:4,y:0,color:icolor},
        2:{x:4,y:1,color:icolor},
        3:{x:4,y:2,color:icolor}
    }
];
tetrisShape['t'] = [
    {
        0:{x:4,y:0,color:tcolor},
        1:{x:5,y:0,color:tcolor},
        2:{x:6,y:0,color:tcolor},
        3:{x:5,y:-1,color:tcolor}
    },
    {
        0:{x:4,y:0,color:tcolor},
        1:{x:5,y:0,color:tcolor},
        2:{x:5,y:1,color:tcolor},
        3:{x:5,y:-1,color:tcolor}
    },
    {
        0:{x:4,y:0,color:tcolor},
        1:{x:5,y:0,color:tcolor},
        2:{x:6,y:0,color:tcolor},
        3:{x:5,y:1,color:tcolor}
    },
    {
        0:{x:5,y:0,color:tcolor},
        1:{x:6,y:0,color:tcolor},
        2:{x:5,y:1,color:tcolor},
        3:{x:5,y:-1,color:tcolor}
    }
];
var tetrisDirect = 0;
var tetris4 = [];
var tetris;
var next_tetris4 = [];
var brickH = 20;
var brick = [
    {x:0,y:20,color:bcolor},
    {x:1,y:20,color:bcolor},
    {x:2,y:20,color:bcolor},
    {x:3,y:20,color:bcolor},
    {x:4,y:20,color:bcolor},
    {x:5,y:20,color:bcolor},
    {x:6,y:20,color:bcolor},
    {x:7,y:20,color:bcolor},
    {x:8,y:20,color:bcolor},
    {x:9,y:20,color:bcolor},
    {x:-1,y:-1,color:bcolor},
    {x:-1,y:0,color:bcolor},
    {x:-1,y:1,color:bcolor},
    {x:-1,y:2,color:bcolor},
    {x:-1,y:3,color:bcolor},
    {x:-1,y:4,color:bcolor},
    {x:-1,y:5,color:bcolor},
    {x:-1,y:6,color:bcolor},
    {x:-1,y:7,color:bcolor},
    {x:-1,y:8,color:bcolor},
    {x:-1,y:9,color:bcolor},
    {x:-1,y:10,color:bcolor},
    {x:-1,y:11,color:bcolor},
    {x:-1,y:12,color:bcolor},
    {x:-1,y:13,color:bcolor},
    {x:-1,y:14,color:bcolor},
    {x:-1,y:15,color:bcolor},
    {x:-1,y:16,color:bcolor},
    {x:-1,y:17,color:bcolor},
    {x:-1,y:18,color:bcolor},
    {x:-1,y:19,color:bcolor},
    {x:-1,y:20,color:bcolor},
    {x:10,y:-1,color:bcolor},
    {x:10,y:0,color:bcolor},
    {x:10,y:1,color:bcolor},
    {x:10,y:2,color:bcolor},
    {x:10,y:3,color:bcolor},
    {x:10,y:4,color:bcolor},
    {x:10,y:5,color:bcolor},
    {x:10,y:6,color:bcolor},
    {x:10,y:7,color:bcolor},
    {x:10,y:8,color:bcolor},
    {x:10,y:9,color:bcolor},
    {x:10,y:10,color:bcolor},
    {x:10,y:11,color:bcolor},
    {x:10,y:12,color:bcolor},
    {x:10,y:13,color:bcolor},
    {x:10,y:14,color:bcolor},
    {x:10,y:15,color:bcolor},
    {x:10,y:16,color:bcolor},
    {x:10,y:17,color:bcolor},
    {x:10,y:18,color:bcolor},
    {x:10,y:19,color:bcolor},
    {x:10,y:20,color:bcolor}
];
var tetris_id;
var speed = 1000;

document.onkeydown = function(e){
    if(e && e.keyCode == 80 && state == 'g'){
        clearInterval(tetris_id);
        state = 'p';
    } else if (state == 'p'){
        tetris_id = setInterval('tetris_fall()',speed);
        state = 'g';
    }
    if(e && e.keyCode == 37)
        moveLeft();

    if(e && e.keyCode == 38)
        tetris_spin();

    if(e && e.keyCode == 39)
        moveRight();

    if(e && e.keyCode == 40)
        fallDown();

    fresh();
    tetris_show();
    brick_show();
};

function moveLeft(){
    if(isMoveLeft()){
        for(var i = 0;i<tetris4.length;i++)
            for(var j = 0;j<4;j++)
                tetris4[i][j].x = tetris4[i][j].x-1;
        tetris = cloneObj(tetris4[tetrisDirect]);
    }

}

function isMoveLeft(){
    for(var i = 0;i<4;i++)
        for(var j = 0;j<brick.length;j++){
            if(tetris[i].x - 1 == brick[j].x && tetris[i].y == brick[j].y)
                return false;
        }
    return true;
}

function moveRight(){
    if(isMoveRight()){
        for(i = 0;i<tetris4.length;i++)
            for(j = 0;j<4;j++)
                tetris4[i][j].x = tetris4[i][j].x+1;
        tetris = cloneObj(tetris4[tetrisDirect]);
    }
}

function isMoveRight(){
    for(var i = 0;i<4;i++)
        for(var j = 0;j<brick.length;j++){
            if(tetris[i].x + 1 == brick[j].x && tetris[i].y == brick[j].y)
                return false;
        }
    return true;
}

function isSpinnable(){
    for(var i = 0;i<4;i++)
        for(var j = 0;j<brick.length;j++){
        if(tetris4[(tetrisDirect+1)%tetris4.length][i].x == brick[j].x && tetris4[(tetrisDirect+1)%tetris4.length][i].y == brick[j].y)
            return false;
        }
        return true;
}

function tetris_spin(){
    if(isSpinnable()){
        tetrisDirect = (tetrisDirect+1)%tetris4.length;
        for(i = 0;i<4;i++)
            tetris[i] = cloneObj(tetris4[tetrisDirect][i]);
    }
}
function fallDown(){
    speed = 50;
    clearInterval(tetris_id);
    tetris_id = setInterval('tetris_fall()',speed);
}
function brick_show(){
    for(var i = 0;i<brick.length;i++)
        block(brick[i].x,brick[i].y,brick[i].color);
}

function tetris_up(){

    for(var i = 0;i<tetris4.length;i++)
        for(var j = 0;j<4;j++)
            tetris4[i][j].y = tetris4[i][j].y-1;
    tetris = cloneObj(tetris4[tetrisDirect]);

}
function fullLine(){
    var liney = [];

    for(var j = 0;j<20;j++) {
        var brickNum = 0;
        for (var i = 0; i < brick.length; i++) {
            if (brick[i].y == j)
                brickNum = brickNum + 1;
        }
        if(brickNum == 12)
            liney.push(j)
    }

    return liney;
}

function removeLine(y){
    for(var i = 0;i<brick.length;i++)
        if(brick[i].y == y && brick[i].x !== -1 && brick[i].x !== 10){
            brick.splice(i,1);
            i = i -1
        }
}

function checkHeight(){
    for(var i = 0;i<brick.length;i++)
        if(brick[i].y<brickH && brick[i].x !== -1 && brick[i].x !== 10)
            brickH = brick[i].y;
}

function brick_fall(y){
    for(var i = 0;i<brick.length;i++)
        if(brick[i].y<y && brick[i].x !== -1 && brick[i].x !== 10)
            brick[i].y = brick[i].y + 1
}

function addScore(s){
    if(s == 1)
        score = score+100;
    if(s == 2)
        score = score+300;
    if(s == 3)
        score = score+700;
    if(s == 4)
        score = score+1500;
}

function tetris_show(){
    for(var i = 0;i<4;i++)
        block(tetris[i].x,tetris[i].y,tetris[i].color);
}

function random_tetris(){
    tetrisDirect = 0;
    var i = Math.floor(Math.random()*7);
    tetrisType = tetrisAll[i];
    tetris4.splice(0,tetris4.length);
    tetris4 = deepCopy(tetrisShape[tetrisType]);
    tetris = deepCopy(tetris4[tetrisDirect]);
}

function random_nextTetris4(){
    var i = Math.floor(Math.random()*7);
    tetrisType = tetrisAll[i];
    next_tetris4.splice(0,next_tetris4.length);
    next_tetris4 = deepCopy(tetrisShape[tetrisType]);
}

function tetris_fall(){
    fresh();
    for(var i = 0;i<tetris4.length;i++)
        for(var j = 0;j<4;j++)
            tetris4[i][j].y = tetris4[i][j].y+1;
    tetris = cloneObj(tetris4[tetrisDirect]);
    tetris_land();
    tetris_show();
    brick_show();
}

function tetris_land(){
    for(var i = 0;i<4;i++)
        for(var j = 0;j<brick.length;j++){
            if(tetris[i].x == brick[j].x && tetris[i].y == brick[j].y){
                fresh();
                textFresh();
                tetris_up();


                for(var n = 0;n<4;n++)
                    brick.push(tetris[n]);
                checkHeight();
                var liney = fullLine();
                if(liney){
                    lineRemoved = lineRemoved+liney.length;
                    for(var k = 0;k<liney.length;k++){
                        removeLine(liney[k]);
                        brick_fall(liney[k]);
                    }
                    addScore(liney.length);
                }


                level = Math.floor(lineRemoved/20)+1;
                cxt.fillStyle = '#150509';
                cxt.fillText(score,210,165);
                cxt.fillText(level,210,240);
                brick_show();
                clearInterval(tetris_id);

                speed = 1100-level*100;
                if(brickH < 1){
                    document.getElementById('score').innerHTML = 'Game Over';
                    return;
                }
                round();
            }
        }
}

/*or
 function isTetrisLanded(){
 for(var i = 0;i<4;i++)
 for(var j =0;j<brick.length;j++){
 if(tetris[i].x == brick[j].x && tetris[i].y == brick[j].y){
 return true;
 }
 }
 }
 */

function round(){

    tetris4 = deepCopy(next_tetris4);
    tetrisDirect = 0;
    tetris = deepCopy(tetris4[tetrisDirect]);
    random_nextTetris4();
    for(i = 0;i<4;i++)
        block(next_tetris4[0][i].x+11,next_tetris4[0][i].y+6,next_tetris4[0][i].color);
    tetris_id = setInterval('tetris_fall()',speed);
}

function init(){

    speed = 1000;
    tetris4 = tetris4.splice(0,tetris4.length);
    tetrisDirect = 0;

    brick = deepCopy([
        {x:0,y:20,color:bcolor},
        {x:1,y:20,color:bcolor},
        {x:2,y:20,color:bcolor},
        {x:3,y:20,color:bcolor},
        {x:4,y:20,color:bcolor},
        {x:5,y:20,color:bcolor},
        {x:6,y:20,color:bcolor},
        {x:7,y:20,color:bcolor},
        {x:8,y:20,color:bcolor},
        {x:9,y:20,color:bcolor},
        {x:-1,y:-1,color:bcolor},
        {x:-1,y:0,color:bcolor},
        {x:-1,y:1,color:bcolor},
        {x:-1,y:2,color:bcolor},
        {x:-1,y:3,color:bcolor},
        {x:-1,y:4,color:bcolor},
        {x:-1,y:5,color:bcolor},
        {x:-1,y:6,color:bcolor},
        {x:-1,y:7,color:bcolor},
        {x:-1,y:8,color:bcolor},
        {x:-1,y:9,color:bcolor},
        {x:-1,y:10,color:bcolor},
        {x:-1,y:11,color:bcolor},
        {x:-1,y:12,color:bcolor},
        {x:-1,y:13,color:bcolor},
        {x:-1,y:14,color:bcolor},
        {x:-1,y:15,color:bcolor},
        {x:-1,y:16,color:bcolor},
        {x:-1,y:17,color:bcolor},
        {x:-1,y:18,color:bcolor},
        {x:-1,y:19,color:bcolor},
        {x:-1,y:20,color:bcolor},
        {x:10,y:-1,color:bcolor},
        {x:10,y:0,color:bcolor},
        {x:10,y:1,color:bcolor},
        {x:10,y:2,color:bcolor},
        {x:10,y:3,color:bcolor},
        {x:10,y:4,color:bcolor},
        {x:10,y:5,color:bcolor},
        {x:10,y:6,color:bcolor},
        {x:10,y:7,color:bcolor},
        {x:10,y:8,color:bcolor},
        {x:10,y:9,color:bcolor},
        {x:10,y:10,color:bcolor},
        {x:10,y:11,color:bcolor},
        {x:10,y:12,color:bcolor},
        {x:10,y:13,color:bcolor},
        {x:10,y:14,color:bcolor},
        {x:10,y:15,color:bcolor},
        {x:10,y:16,color:bcolor},
        {x:10,y:17,color:bcolor},
        {x:10,y:18,color:bcolor},
        {x:10,y:19,color:bcolor},
        {x:10,y:20,color:bcolor}
    ]);
    score = 0;
    lineRemoved = 0;


    random_tetris();
    random_nextTetris4();
    tetris = deepCopy(tetris4[tetrisDirect]);
    tetris_show();
    brick_show();
    textFresh();
    clearInterval(tetris_id);
    tetris_id = setInterval('tetris_fall()',speed);
}

init();