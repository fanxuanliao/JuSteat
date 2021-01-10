let foodImgOne;
let foodImgTwo;
let foodImgThree;
let foodImgFour;

let selected_food = [];
let food = [];
let space = [];

let item_missed;

let draggingSideCanvas;
let canvasBackGroundImg;

let GameOverImg = "./assets/Second_Round-End-1.png", SuccessImg = "./assets/Round-Success-1-1.png";
let RestartImg = "./assets/Restart.png", BackToMainImg = "./assets/回到主畫面.png", NextLevelImg = "./assets/Level2/Next.png";

function preload(){
    foodImgOne = loadImage('./assets/Level1/drink.png');
    foodImgTwo = loadImage('./assets/Level1/fries.png');
    foodImgThree = loadImage('./assets/Level1/burgur.png');
    foodImgFour = loadImage('./assets/Level1/ICE.png');

    canvasBackGroundImg = loadImage('./assets/Level1/bikeidle.gif');
}

function setup() {
    /*
    *   把canvas放在手機介面的右邊，故設定position為(410,58)，這是慢慢調出來的結果。
    * */
    draggingSideCanvas = createCanvas(850, 670);
    draggingSideCanvas.position(350,0);
    draggingSideCanvas.parent('container');
    //canvasBackGroundImg.width = canvasBackGroundImg.width * 0.98;
    //canvasBackGroundImg.height = canvasBackGroundImg.height * ;

    food[0] = new Food(75,15, foodImgOne);
    food[1] = new Food(267,17, foodImgTwo);
    food[2] = new Food(460,25, foodImgThree);
    food[3] = new Food(652,25, foodImgFour);

    space[0] = new Rect(82,30);
    space[1] = new Rect(274,30);
    space[2] = new Rect(466,30);
    space[3] = new Rect(658,30);

    selected_food[0] = new Selected_food(20,  187, foodImgOne); //drink
    selected_food[1] = new Selected_food(105, 190, foodImgTwo); //fries
    selected_food[2] = new Selected_food(235, 190, foodImgThree); //burger
    selected_food[3] = new Selected_food(335, 190, foodImgFour); //ice cream

    item_missed = int(random(0,3));
    selected_food[item_missed].selected = false;
    food[item_missed].selected = false;
}

function draw() {
    background(100);

    image(canvasBackGroundImg,0,175);

    fill(255,202,56);
    stroke(51);
    strokeWeight(10);
    rect(0,0,850,175);  //置放欄紅色底部

    for(let j = 0; j < space.length; j++){
        space[j].display();
    }

    for(let i = 0; i < food.length; i++) {
        food[i].display();
    }

    for(let k = 0; k < selected_food.length; k++){
        selected_food[k].display();
    }
}

function mousePressed(){
    for(let i = 0; i < food.length; i++){
        if(food[i].over()){
            food[i].dragging = true;
        }
        if(selected_food[i].over()){
            selected_food[i].dragging = true;
        }

    }
}

function mouseReleased(){
    for(let i = 0; i < food.length; i++){
        food[i].dragging = false;
        selected_food[i].dragging = false;
        selected_food[i].selected = food[i].selected;
    }
}

class Food {
    constructor(inX, inY, inImg, drag = false, select = true) {
        this.initX = inX;
        this.initY = inY;
        this.x = inX;
        this.y = inY;
        this.img = inImg;
        this.dragging = drag; //一開始都設定為未拖曳
        this.selected = select;

        this.img.width = this.img.width * 0.25;
        this.img.height = this.img.height * 0.25;
    }

    display(){
        if(this.dragging){
            this.x = mouseX - (this.img.width/2);
            this.y = mouseY - (this.img.height/2);

            if(this.y > 180){
                this.selected = true;
            }

        } else {
            this.x = this.initX;
            this.y = this.initY;
        }
        if(!this.miss) {
            image(this.img, this.x, this.y);
        }
    }

    over(){
        /*
        * 判斷滑鼠是否food的圖片上方。
        * */
        if(mouseX > this.x && mouseX < this.x + this.img.width && mouseY > this.y && mouseY < this.y + this.img.height){
            return true;
        } else {
            return false;
        }
    }
}

class Rect{
    constructor(inX, inY) {
        this.x = inX;
        this.y = inY;
    }

    display(){
        fill(249);
        noStroke();
        rect(this.x, this.y, 110, 110);
    }
}

class Selected_food{
    constructor(inX, inY, inImg, drag = false,select = true) {
        this.initX = inX;
        this.initY = inY;

        this.x = inX;
        this.y = inY;
        this.img = inImg;
        this.dragging = drag;
        this.selected = select;
    }

    display(){
        this.img.width = this.img.width * 1.25;
        this.img.height = this.img.height * 1.25;

        if(this.dragging){
            this.x = mouseX - (this.img.width/2);
            this.y = mouseY - (this.img.height/2);

            if(this.y < 50){
                this.selected = false;
                food[selected_food.indexOf(this)].selected = false;
            }

        } else {
            this.x = this.initX;
            this.y = this.initY;
        }

        if(this.selected) {
            image(this.img, this.x, this.y);
        }

        this.img.width = this.img.width / 1.25;
        this.img.height = this.img.height / 1.25;
    }

    over(){
        /*
        * 判斷滑鼠是否food的圖片上方。
        * */
        if(mouseX > this.x && mouseX < this.x + this.img.width && mouseY > this.y && mouseY < this.y + this.img.height){
            return true;
        } else {
            return false;
        }
    }
}

function start(){
    let rmGuide = document.getElementById("guide_button_two");
    rmGuide.remove();
}

function showResult(){
    draggingSideCanvas.clear();
    let leftBtn;
    let rightBtn;
    let rmPhoneSide = document.getElementById("phoneSide");
    rmPhoneSide.remove();

    //let rmButtonPage = document.getElementById("button page");
    //rmButtonPage.remove();

    let rmDraggingSide = document.getElementById("draggingSide");
    rmDraggingSide.remove();

    let resultImg;

    if(selected_food[0].selected && selected_food[1].selected && selected_food[2].selected && selected_food[3].selected) {
        resultImg = createImg(SuccessImg);
        leftBtn = createImg(NextLevelImg);
        leftBtn.addClass("button redirect next");
        leftBtn.mousePressed(function() {location.href='Level2.html';});
    } else {
        leftBtn = createImg(RestartImg);
        leftBtn.addClass("button redirect restart");
        leftBtn.mousePressed(function() {location.reload();});
    }

    resultImg.addClass("resultImg")
    rightBtn = createImg(BackToMainImg);
    rightBtn.addClass("button redirect back");
    rightBtn.mousePressed(function(){location.href='index.html';});
}