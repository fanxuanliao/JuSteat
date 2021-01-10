let packageOne;
let packageTwo;
let packageThree;
let packageFour;

let button = [];

let pickingSideCanvas;

let canvasBackgroundImg;

let GameOverImg = "./assets/Second_Round-End-1.png";
let RestartImg = "./assets/Restart.png", BackToMainImg = "./assets/回到主畫面.png";

function preload(){
    /*
     *   packageOne ~ packageFour分別對應到4個不同的訂單圖案
     *   目前還沒有圖所以用之前作業的plane.jpg示意
     */
    packageOne = loadImage('./assets/Level1/bag1.png');
    packageTwo = loadImage('./assets/Level1/bag2.png');
    packageThree = loadImage('./assets/Level1/bag03.png');
    packageFour = loadImage('./assets/Level1/bag04.png');

    canvasBackgroundImg = loadImage('./assets/Level1/L1BG.png');
}

function setup() {
    /*
    *   把canvas放在手機介面的右邊，故設定position為(410,58)，這是慢慢調出來的結果。
    * */
    pickingSideCanvas = createCanvas(850, 670);
    pickingSideCanvas.position(350,0); //410
    pickingSideCanvas.parent('container');

    canvasBackgroundImg.width = canvasBackgroundImg.width * 1.15;
    canvasBackgroundImg.height = canvasBackgroundImg.height * 1.15;

    button[0] = new Button(200,150, packageOne);
    button[1] = new Button(500,150, packageTwo);
    button[2] = new Button(200,400, packageThree);
    button[3] = new Button(500,400, packageFour)
}

function draw() {
    background(255,202,88);
    image(canvasBackgroundImg,0,0);

    for(let i = 0; i < button.length; i++) {
        button[i].display();
    }
}

function mousePressed(){
    /*
    *  偵測滑鼠點擊，if(游標在button[i]的範圍)，則button[i].selected=true，
    *   因此在display()裡面就會設定button圖片透明度變低，達到"選取訂單"的效果。
    * */
    for(let i = 0; i < button.length; i++){

        if(button[i].over()){
            button[i].selected = true;
            for(let j = 0; j < button.length; j++) {
                if(i!==j) {
                    button[j].selected = false;
                }
            }
        }

    }
}

class Button {
    constructor(inX, inY, inImg, select = false) {
        this.x = inX;
        this.y = inY;
        this.img = inImg;
        this.selected = select;  //一開始都設定為未選取

        this.img.width = this.img.width * 0.5;
        this.img.height = this.img.height * 0.5;
    }

    display(){
        /*
        * if(button[i].selected==true)，則做透明度處理，
        * */
        if(this.selected){
            tint(255,126);
        } else {
            noTint();
        }

        image(this.img, this.x, this.y);
    }

    over(){
        /*
        * 判斷滑鼠是否在button的圖片上方。
        * */
        if(mouseX > this.x && mouseX < this.x + this.img.width && mouseY > this.y && mouseY < this.y + this.img.height){
            return true;
        } else {
            return false;
        }
    }
}

function start(){
    let rmGuide = document.getElementById("guide_button");
    rmGuide.remove();
}

function check(){
    let resultImg;

    if(button[2].selected){
        self.location.href='Level1-2.html';
    } else {
        resultImg = createImg(GameOverImg);

        pickingSideCanvas.clear();

        let rmPhoneSide = document.getElementById("phoneSide");
        rmPhoneSide.remove();

        //let rmButtonPage = document.getElementById("button page");
        //rmButtonPage.remove();

        let rmPickingSide = document.getElementById("pickingSide");
        rmPickingSide.remove();

        resultImg.addClass("resultImg")
        let restartBtn = createImg(RestartImg);
        restartBtn.addClass("button redirect restart");
        let backBtn = createImg(BackToMainImg);
        backBtn.addClass("button redirect back");
        restartBtn.mousePressed(function() {location.reload();});
        backBtn.mousePressed(function(){location.href='index.html';});
    }


}

function showResult(){
    pickingSideCanvas.clear();

    let rmPhoneSide = document.getElementById("phoneSide");
    rmPhoneSide.remove();

    //let rmButtonPage = document.getElementById("button page");
    //rmButtonPage.remove();

    let rmPickingSide = document.getElementById("pickingSide");
    rmPickingSide.remove();

    let resultImg;

    resultImg = createImg(GameOverImg);

    resultImg.addClass("resultImg")
    let restartBtn = createImg(RestartImg);
    restartBtn.addClass("button redirect restart");
    let backBtn = createImg(BackToMainImg);
    backBtn.addClass("button redirect back");
    restartBtn.mousePressed(function() {location.reload();});
    backBtn.mousePressed(function(){location.href='index.html';});
}