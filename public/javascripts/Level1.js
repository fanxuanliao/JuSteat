let defaultPackage;

let packageOne;
let packageTwo;
let packageThree;
let packageFour;

let button = [];


function preload(){
    /*
     *   packageOne ~ packageFour分別對應到4個不同的訂單圖案
     *   目前還沒有圖所以用之前作業的plane.jpg示意
     *   defaultPackage的存在是為了解決某個我不知道為什麼的bug, 後面解釋
     */
    // defaultPackage = loadImage('images/plane.jpg');

    packageOne = loadImage('assets/plane.jpg');
    packageTwo = loadImage('assets/plane.jpg');
    packageThree = loadImage('assets/plane.jpg');
    packageFour = loadImage('assets/plane.jpg');
}

function setup() {
    /*
    *   把canvas放在手機介面的右邊，故設定position為(410,58)，這是慢慢調出來的結果。
    * */
    let pickingSideCanvas = createCanvas(850, 670);
    pickingSideCanvas.position(410,58);

    /*
    * Button是一個class，見下面class Button的註解。
    * button[0]一樣是為了解決那個不知道為什麼的bug。
    * */
    // button[0] = new Button(1000,700, defaultPackage);

    button[0] = new Button(200,150, packageOne);
    button[1] = new Button(500,150, packageTwo);
    button[2] = new Button(200,400, packageThree);
    button[3] = new Button(500,400, packageFour)
}

function showIntro(){
    let introBackgournd = color(100,100,100);
    // noStoke();
    fill(introBackgournd);
    tint(255,200)
    rect(0, 0, 850, 670, 20);
}

function draw() {
    background(249);
    for(let i = 0; i < button.length; i++) {
        button[i].display();
        if (button[i].selected==true){
            console.log(i+"selected");
        }
    }
    showIntro();
}

function mousePressed(){
    /*
    *  偵測滑鼠點擊，if(游標在button[i]的範圍)，則button[i-1].selected=true，
    *   因此在display()裡面就會設定button圖片透明度變低，達到"選取訂單"的效果。
    * */
    for(let i = 0; i < button.length; i++){
        if(button[i].over()){
            console.log('button:'+i+' been clicked');
            button[i].selected = true;
            // button[i].selected = false; //以免上一個點的button是button[i-1]。例如上次點button[1]，這次點button[2]。
            //console.log('button'+(i-1)+'='+button[i-1].selected);
            button[i].display();
        } else {     
            console.log('button:'+i+' not been clicked');
            button[i].selected = false;
        }
    }
}

class Button {
    constructor(inX, inY, inImg, select=false) {
        this.x = inX;
        this.y = inY;
        this.img = inImg;
        this.selected = select;  //一開始都設定為未選取
    }

    display(){
        // for (let btn in button){
        //     console.log(typeof (btn.selected));
        // }
        if(this.selected===true){
            tint(255,126);
        } else {
            noTint();
        }
        image(this.img, this.x, this.y);

        /*
        * 原本是想說if(button[i].selected==true)，則做透明度處理，
        * 但不知為何它會讓button[i+1]做透明處理，所以前面mousePressed()裡面才會讓button[i-1].selected=true。
        * */

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