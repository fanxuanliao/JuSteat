let foodImgOne;
let foodImgTwo;
let foodImgThree;
let foodImgFour;

let selected_food = [];
let food = [];
let space = [];

let item_missed;

let cnv;

function preload(){
    foodImgOne = loadImage('../assets/第一關/drink.png');
    foodImgTwo = loadImage('../assets/第一關/fries.png');
    foodImgThree = loadImage('../assets/第一關/burgur.png');
    foodImgFour = loadImage('../assets/第一關/ICE.png');
}

function setup() {
    /*
    *   把canvas放在手機介面的右邊，故設定position為(410,58)，這是慢慢調出來的結果。
    * */
    cnv = createCanvas(850, 670);
    cnv.position(410,58);
    cnv.parent("level_one_canvas");

    food[0] = new Food(75,15, foodImgOne);
    food[1] = new Food(267,17, foodImgTwo);
    food[2] = new Food(460,25, foodImgThree);
    food[3] = new Food(652,25, foodImgFour);

    space[0] = new Rect(82,30);
    space[1] = new Rect(274,30);
    space[2] = new Rect(466,30);
    space[3] = new Rect(658,30);

    selected_food[0] = new Selected_food(300, 290, foodImgOne); //drink
    selected_food[1] = new Selected_food(190, 380, foodImgTwo); //fries
    selected_food[2] = new Selected_food(470, 300, foodImgThree); //burger
    selected_food[3] = new Selected_food(365, 380, foodImgFour); //ice cream

    item_missed = int(random(0,3));
    selected_food[item_missed].selected = false;
    food[item_missed].selected = false;
}

function draw() {
    background(100);
    fill(221,0,0);
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
        this.img.width = this.img.width * 1.5;
        this.img.height = this.img.height * 1.5;

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

        this.img.width = this.img.width / 1.5;
        this.img.height = this.img.height / 1.5;
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