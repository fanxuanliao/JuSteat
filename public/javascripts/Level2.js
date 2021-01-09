var lastAddTime = 0;  //上次生成物件的時間（第一道）
var lastAddTime2 = 0; //上次生成物件的時間（第二道)
var lastAddTime3 = 0; //上次生成物件的時間（第三道)
let traffics = [];    //第一道的物件list
let traffics2 = [];   //第二道的物件list
let traffics3 = [];   //第三道的物件list
let traffics_pic = [];//障礙物圖片的圖list
let lifes = [];       //愛心的list
var backimg;          //背景圖片
var backimg_loc = 0;  //背景圖片位置

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
        this.img = traffics_pic[getRandom(1,4)];
        this.w = 120;
        this.h = 100;
        this.x = 1200;
        this.y = 200;
    }
    //障礙物移動
    move(){
        this.x -= 5;
    }
    show(){                                       
        image(this.img,this.x,this.y,this.w,this.h);       
    }
}
//第二條路的class
class Traffic2{
    constructor(){
        this.img = traffics_pic[getRandom(1,4)];
        this.w = 120;
        this.h = 100;
        this.x = 1200;
        this.y = 380;
    }
    //障礙物移動
    move(){
        this.x -= 5;
    }
    show(){                                       
        image(this.img,this.x,this.y,this.w,this.h);       
    }
}
//第三條路的class
class Traffic3{
    constructor(){
        this.img = traffics_pic[getRandom(1,4)];
        this.w = 120;
        this.h = 100;
        this.x = 1200;
        this.y = 550;
    }
    //障礙物移動
    move(){
        this.x -= 5;
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
        backimg_loc -= 4;                          
    }
    else{
        backimg_loc = 0;
    }                         
    image(backimg,backimg_loc,0,backimg.width,backimg.height);  
 }

function preload() {

    backimg = loadImage('assets/第二關/2b-2.png');
    motorcycle_people = loadImage('assets/第二關/biek.png');

    for (let j=1; j<=4; j++) {             
        var str2 ="assets/第二關/t"+j+".png";
        traffics_pic[j]= loadImage(str2);       
    }

    var x = 40;
    for(var i=0; i<5; i++){
        lifes[i] = createSprite(x,30);
        lifes[i].addImage(loadImage('assets/第二關/heart.png'));
        x += 60;
    }
}

function setup() {
    createCanvas(1200, 670);
    motorcycle = new Motorcycle(); 
    traffic = new Traffic();
    traffic2 = new Traffic2();
    traffic3 = new Traffic3();
}

function draw() {
    background(246, 125, 125);
    backGroundPicture();
    motorcycle.show()
    // random產生障礙物 1st
    var interval = random(4000,6000);           
    if (millis()-lastAddTime > interval) {
        traffics.push(new Traffic());      
        lastAddTime = millis();              
    }
    // random產生障礙物 2nd
    var interval2 = random(6000,8000);           
    if (millis()-lastAddTime2 > interval2) {
        traffics2.push(new Traffic2());      
        lastAddTime2 = millis();              
    }
    // random產生障礙物 3rd
    var interval3 = random(5000,9000);           
    if (millis()-lastAddTime3 > interval3) {
        traffics3.push(new Traffic3());      
        lastAddTime3 = millis();              
    }
    //1st
    for(let c of traffics){
        c.move();                            
        c.show();    
        if(motorcycle.hits(c)){ //碰撞偵測
            delete c.x;  
            console.log(motorcycle.life)
            motorcycle.life -= 1;
            lifes[motorcycle.life].remove(); // 移除一顆心                           
        }
        if(motorcycle.life == 0){ 
            textAlign(CENTER);        
            textSize(70);             
            text("game over",width/2, height/2);
            noLoop(); 
        }
        if(c.x<0){
            delete c.x;
        }                      
    }
    //2nd
    for(let c of traffics2){
        c.move();                            
        c.show();    
        if(motorcycle.hits(c)){
            delete c.x;  
            console.log(motorcycle.life)
            motorcycle.life -= 1;
            lifes[motorcycle.life].remove();                              
        }
        if(motorcycle.life == 0){
            textAlign(CENTER);        
            textSize(70);             
            text("game over",width/2, height/2);
            noLoop(); 
        }
        if(c.x<0){
            delete c.x;
        }                      
    }
    //3rd
    for(let c of traffics3){
        c.move();                            
        c.show();    
        if(motorcycle.hits(c)){
            delete c.x;  
            console.log(motorcycle.life)
            motorcycle.life -= 1;
            lifes[motorcycle.life].remove();                              
        }
        if(motorcycle.life == 0){
            textAlign(CENTER);        
            textSize(70);             
            text("game over",width/2, height/2);
            noLoop(); 
        }
        if(c.x<0){
            delete c.x;
        }                     
    }
    
    //操控外送員
    if (keyWentDown(DOWN_ARROW)){
        motorcycle.y += 180;
    }
    else if (keyWentDown(UP_ARROW)){
        motorcycle.y -= 180;
    }
    else{
        motorcycle.y += 0;
    }
    //移動位置限制
    if (motorcycle.y > 530){
        motorcycle.y = 530;
    }
    if (motorcycle.y < 180){
        motorcycle.y = 180;
    }

    drawSprites();
}

