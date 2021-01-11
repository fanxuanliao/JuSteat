let START = false; //遊戲開始
var lastAddTime = 0;  //上次生成物件的時間（第一道）
var lastAddTime2 = 0; //上次生成物件的時間（第二道)
var lastAddTime3 = 0; //上次生成物件的時間（第三道)
var gametime = 0;
var heart_x = 40;
let traffics = [];    //第一道的物件list
let traffics2 = [];   //第二道的物件list
let traffics3 = [];   //第三道的物件list
let traffics_pic = [];//障礙物圖片的圖list
let lifes = [];       //愛心的list
var backimg;          //背景圖片
var backimg_loc = 0;  //背景圖片位置
let GameOverImg = "./assets/Level2/Second_Round-End-1.png", SuccessImg = "./assets/Level2/Round-Success-2-1.png";
let RestartImg = "./assets/Level2/Restart.png", BackToMainImg = "./assets/Level2/回到主畫面.png", NextLevelImg = "./assets/Level2/Next.png";

function start(){
    let rmGuide = document.getElementById("guide_button");
    rmGuide.remove();
    START = true;
}

// 外送員class
class Motorcycle{
    constructor(){
        this.img = motorcycle_people;
        this.w = 150;
        this.h = 120;
        this.x = 100;
        this.y = 360;
        this.life = 5;
    }
    //show image
    show(){
        image(this.img,this.x,this.y,this.w,this.h);
    }
    //collider
    hits(traffics){
        return collideRectRect(this.x, this.y, this.w, this.h, traffics.x, traffics.y, traffics.w, traffics.h);
    }
}
// 我把他分成三個軌道獨立
// 第一條路的class
class Traffic{
    constructor(){
        this.flag = getRandom(1,4);
        this.img = traffics_pic[this.flag];
        this.w = 120;
        this.h = 100;
        this.x = 1200;
        this.y = 200;
    }
    //障礙物移動
    move(){
        this.x -= 10;
    }
    show(){
        image(this.img,this.x,this.y,this.w,this.h);
    }
}
//第二條路的class
class Traffic2{
    constructor(){
        this.flag = getRandom(1,4);
        this.img = traffics_pic[this.flag];
        this.w = 120;
        this.h = 100;
        this.x = 1200;
        this.y = 380;
    }
    //障礙物移動
    move(){
        this.x -= 10;
    }
    show(){
        image(this.img,this.x,this.y,this.w,this.h);
    }
}
//第三條路的class
class Traffic3{
    constructor(){
        this.flag = getRandom(1,4);
        this.img = traffics_pic[this.flag];
        this.w = 120;
        this.h = 100;
        this.x = 1200;
        this.y = 550;
    }
    //障礙物移動
    move(){
        this.x -= 10;
    }
    show(){
        image(this.img,this.x,this.y,this.w,this.h);
    }
}
//取整數random function
function getRandom(min,max){
    return Math.floor(Math.random()*max)+min;
};
//背景循環function
function backGroundPicture(){

    if(backimg_loc > (-1)*(backimg.width)/2){
        backimg_loc -= 8;
    }
    else{
        backimg_loc = 0;
    }
    image(backimg,backimg_loc,0,backimg.width,backimg.height);
}

function preload() {

    backimg = loadImage('./assets/Level2/2bdouble.png');
    motorcycle_people = loadImage('./assets/Level2/biek.png');

    for (let j=1; j<=4; j++) {
        var str2 ="./assets/Level2/t"+j+".png";
        traffics_pic[j]= loadImage(str2);
    }

    for(var i=0; i<5; i++){
        lifes[i] = createSprite(heart_x,30);
        lifes[i].addImage(loadImage('./assets/heart.png'));
        heart_x += 60;
    }
}

function setup() {
    cnv = createCanvas(1200, 670);
    // cnv.center();
    cnv.parent("container");
    motorcycle = new Motorcycle();
    traffic = new Traffic();
    traffic2 = new Traffic2();
    traffic3 = new Traffic3();
}
var myVar = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();

}

function myStopFunction() {
    clearInterval(myVar);
}

function draw() {
    background(246, 125, 125);
    backGroundPicture();
    motorcycle.show()
    // random產生障礙物 1st
    var interval = random(4000, 6000);
    if (!START) {
        var nowtime = 60;
        gametime = millis();
    }
    else{
        var nowtime = 60 - parseInt((millis() - gametime) / 1000);
    }
    console.log(nowtime);
    textAlign(LEFT);
    textSize(60);
    text("Time: " + nowtime, 950, 0, width / 2, height / 2);

    if (millis() - lastAddTime > interval) {
        traffics.push(new Traffic());
        lastAddTime = millis();
    }
    // random產生障礙物 2nd
    var interval2 = random(6000, 8000);
    if (millis() - lastAddTime2 > interval2) {
        traffics2.push(new Traffic2());
        lastAddTime2 = millis();
    }
    // random產生障礙物 3rd
    var interval3 = random(5000, 9000);
    if (millis() - lastAddTime3 > interval3) {
        traffics3.push(new Traffic3());
        lastAddTime3 = millis();
    }
    //1st
    for (let c of traffics) {
        if (nowtime <= 0) {
            delete c.x;
            for (var i = 0; i < 5; i++) {
                lifes[i].remove();
            }
            showResult();
            noLoop();
        }
        c.move();
        c.show();
        if (motorcycle.hits(c)) { //碰撞偵測
            if (c.flag != 3) {
                delete c.x;
                console.log(motorcycle.life)
                heart_x -= 60;
                motorcycle.life -= 1;
                lifes[motorcycle.life].remove(); // 移除一顆心
            } else if (c.flag == 3) {
                delete c.x;
                console.log(motorcycle.life)
                if (motorcycle.life < 5) {
                    lifes[motorcycle.life] = createSprite(heart_x, 30) // 加上一顆心
                    lifes[motorcycle.life].addImage(loadImage('./assets/heart.png'));
                    motorcycle.life += 1;
                    heart_x += 60;
                }
            }
        }
        if (motorcycle.life == 0) {
            showResult();
            noLoop();
        }
        if (c.x < 0) {
            delete c.x;
        }
    }
    //2nd
    for (let c of traffics2) {
        if (nowtime <= 0) {
            delete c.x;
            for (var i = 0; i < 5; i++) {
                lifes[i].remove();
            }
            showResult();
            noLoop();
        }
        c.move();
        c.show();
        if (motorcycle.hits(c)) {
            if (c.flag != 3) {
                delete c.x;
                console.log(motorcycle.life)
                heart_x -= 60;
                motorcycle.life -= 1;
                lifes[motorcycle.life].remove(); // 移除一顆心
            } else if (c.flag == 3) {
                delete c.x;
                console.log(motorcycle.life)
                if (motorcycle.life < 5) {
                    lifes[motorcycle.life] = createSprite(heart_x, 30) // 加上一顆心
                    lifes[motorcycle.life].addImage(loadImage('./assets/heart.png'));
                    motorcycle.life += 1;
                    heart_x += 60;
                }

            }
        }
        if (motorcycle.life == 0) {
            showResult();
            noLoop();
        }
        if (c.x < 0) {
            delete c.x;
        }
    }
    //3rd
    for (let c of traffics3) {
        if (nowtime <= 0) {
            delete c.x;
            for (var i = 0; i < 5; i++) {
                lifes[i].remove();
            }
            showResult();
            noLoop();
        }
        c.move();
        c.show();
        if (motorcycle.hits(c)) {
            if (c.flag != 3) {
                delete c.x;
                console.log(motorcycle.life)
                heart_x -= 60;
                motorcycle.life -= 1;
                lifes[motorcycle.life].remove(); // 移除一顆心
            } else if (c.flag == 3) {
                delete c.x;
                console.log(motorcycle.life)
                if (motorcycle.life < 5) {
                    lifes[motorcycle.life] = createSprite(heart_x, 30) // 加上一顆心
                    lifes[motorcycle.life].addImage(loadImage('./assets/heart.png'));
                    motorcycle.life += 1;
                    heart_x += 60;
                }
            }
        }
        if (motorcycle.life == 0) {
            showResult();
            noLoop();
        }
        if (c.x < 0) {
            delete c.x;
        }
    }

    //操控外送員
    if (keyWentDown(DOWN_ARROW)) {
        motorcycle.y += 180;
    } else if (keyWentDown(UP_ARROW)) {
        motorcycle.y -= 180;
    } else {
        motorcycle.y += 0;
    }
    //移動位置限制
    if (motorcycle.y > 530) {
        motorcycle.y = 530;
    }
    if (motorcycle.y < 180) {
        motorcycle.y = 180;
    }

    drawSprites();
}

//結算畫面
function showResult(){
    let leftBtn;
    let rightBtn;
    resizeCanvas($(document).width(), $(document).height());
    cnv.clear();
    let resultImg;
    if (motorcycle.life>0){
        // 顯示星星畫面
        resultImg = createImg(SuccessImg);
        let txt = createSpan('Mission Complete!');
        txt.addClass("resultTxt");

        leftBtn = createImg(NextLevelImg);
        leftBtn.addClass("button redirect next");
        leftBtn.mousePressed(function() {location.href='Level3.html';});
    }
    else{
        // Game Over
        resultImg = createImg(GameOverImg);

        leftBtn = createImg(RestartImg);
        leftBtn.addClass("button redirect restart");
        leftBtn.mousePressed(function() {location.reload();});
    }

    resultImg.addClass("resultImg")
    rightBtn = createImg(BackToMainImg);
    rightBtn.addClass("button redirect back");
    rightBtn.mousePressed(function(){location.href='index.html';});
}
