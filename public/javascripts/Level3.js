// let dialogs = []; //儲存已存在的對話框們
let scores = 0;
let start=true;
//LOGO黃：rgb(253, 208, 21) 藍：rgb(0, 176, 232) 橘：rgb(255,152,56);
let yello = "rgb(253, 208, 21)";
let blue = "rgb(0, 176, 232)";
let orange = "rgb(255,152,56)";
let black = "rgb(0, 0, 0)";
let white = "rgb(255, 255, 255)"
let delieverColor = yello;
let customerColor = white;
let tColor = black;
let tSize = 20;
let cnvX = 0,cnvY = 0,cnvW = 900,cnvH = 900;
let pad = 20;
let textX=0,textY=0;
let innerPad = 25;
let dialogH = 50, dialogW = 200;
let maxStringLen = (cnvW/2-pad*2-innerPad*2) % tSize; // 計算單行對話框可容納最大字數
console.log(maxStringLen);

let A="我調查了您的訂單紀錄，訂單跟您平時的一樣，可能是您的錯覺。", B="好的，我會再向餐廳反映您的用餐體驗，不知道可否請您再詳細描述餐點？", C="不好意思，這點可能得待我們向餐廳詢問，畢竟您這邊是個案，我們沒有收到類似的訊息";

function setup(){
    cnv = createCanvas(cnvW, cnvH);
    // cnv.position(cnvX,cnvY);
    cnv.center("horizontal");
    cnv.parent("cnvContainer");
    textSize(tSize);
    textFont("Noto Sans TC");
    textAlign(LEFT, TOP);
    noLoop();
}

function draw(){
    background(249);
    //選擇框
    fill(orange);
    stroke("rgb(255,255,255)");
    rect(cnvX, cnvY + cnvH - 300, cnvW, 300);

    //初始對話
    let stringA = "您好，我有些問題想要投訴。";
    let stringB = "沒有問題，請說！";
    dialogW = stringA.length*tSize + innerPad*2;
    dialogH = tSize + innerPad *2;
    drawDialog(cnvX+cnvW-dialogW-pad, pad, dialogW, dialogH, customerColor);
    stroke(tColor);
    strokeWeight(0.5);
    fill(tColor);
    textSize(tSize);
    textFont("Noto Sans TC");
    textAlign(LEFT, TOP);
    let textX = cnvX + cnvW - dialogW - pad +innerPad;
    let textY = pad+innerPad
    text(stringA, textX, textY);

    dialogW = stringB.length*20 + innerPad*2;
    textX = pad + innerPad;
    textY = 2*pad + dialogH + innerPad;
    drawDialog(pad,pad*2+dialogH,dialogW,dialogH, delieverColor);
    stroke(tColor);
    strokeWeight(0.5);
    fill(tColor);
    textSize(tSize);
    textFont("Noto Sans TC");
    textAlign(LEFT, TOP);
    text(stringB,textX,textY)


    // updateChoice("我調查了您的訂單紀錄，訂單跟您平時的一樣，可能是您的錯覺。","好的，我會再向餐廳反映您的用餐體驗，不知道可否請您再詳細描述餐點？","不好意思，這點可能得待我們向餐廳詢問，畢竟您這邊是個案，我們沒有收到類似的訊息")

}

function drawDialog(x,y,w,h,c){
    noStroke();
    fill(c);
    rect(x,y,w,h,20)
}

function updateDialog(string){
    clear();
    background(249);
    //選擇框
    fill(orange);
    stroke("rgb(255,255,255)");
    rect(cnvX, cnvY + cnvH - 300, cnvW, 300);
    //紀錄字串
    // dialogs.push(string);
    //按照字數產生(字數*N)寬度的對話方框並把之前累積的方框移動上去，發送者是外送員的話靠左，反之靠右
    //dialog長寬需動態按字數算，x固定 y累計算，因應對話有可能會有複數行。
    //text的X也是固定，y累計算。複數行另有計算方式。
    tColor=black;

    dialogW = string.length*tSize + innerPad*2;
    dialogH = tSize + innerPad *2;
    drawDialog(cnvX+cnvW-dialogW-pad, pad, dialogW, dialogH, customerColor);
    stroke(tColor);
    strokeWeight(0.5);
    fill(tColor);
    textX = cnvX + cnvW - dialogW - pad +innerPad;
    textY = pad+innerPad
    text(string, textX, textY);

    updateChoice();


    // if (dialogs.length % 2 == 1) { //客戶發送的訊息
    //     dialogW = string.length*tSize + innerPad*2;
    //     dialogH = tSize + innerPad *2;
    //     drawDialog(cnvX+cnvW-dialogW-pad, pad+dialogH*(dialogs.length-1), dialogW, dialogH, customerColor);
    //     stroke(tColor);
    //     strokeWeight(0.5);
    //     fill(tColor);
    //     textX = cnvX + cnvW - dialogW - pad +innerPad;
    //     textY = pad+innerPad
    //     text(stringA, textX, textY);
    // } else {
    //     dialogW = string.length*20 + innerPad*2;
    //     textX = pad + innerPad;
    //     textY = 2*pad + dialogH + innerPad;
    //     drawDialog(pad,pad*2+dialogH,dialogW,dialogH, delieverColor);
    //     stroke(tColor);
    //     strokeWeight(0.5);
    //     fill(tColor);
    //     text(stringB,textX,textY)
    // } //外送員的訊息
}

function updateChoice(){
    fill(blue);
    noStroke();
    // stroke("rgb(255,255,255)");
    strokeWeight(5);
    rect(cnvX + pad, cnvY + cnvH - 300 + pad, tSize*A.length + innerPad*2, tSize+innerPad*2, 20);
    fill(blue);
    noStroke();
    rect(cnvX + pad, cnvY + cnvH - 300 + pad*2 + tSize+innerPad*2 , tSize*B.length + innerPad*2, tSize+innerPad*2, 20);

    fill(blue);
    noStroke();
    rect(cnvX + pad, cnvY + cnvH - 300 + pad*2*2 + tSize+innerPad*2*2 , tSize*C.length + innerPad*2, tSize+innerPad*2, 20);

    tColor=white;
    stroke(tColor);
    strokeWeight(0.5);
    fill(tColor);
    textAlign(LEFT, TOP);
    textX = cnvX + pad + innerPad;
    textY = cnvY + cnvH - 300 + pad + innerPad;
    text(A, textX, textY);

    textY = cnvY + cnvH - 300 + pad*2 + innerPad*2 + tSize*2 + 5;
    text(B, textX, textY);

    textY = cnvY + cnvH - 300 + pad*3 + innerPad*3 + tSize*2*2 +10;
    text(C, textX, textY);
}

// When the user clicks the mouse
function mousePressed() {
    if (start){
        updateDialog("這次餐點的味道很奇怪，跟平常不太一樣。");
        start=false;
    }
    // Check if mouse is inside the choices rects
    //選A
    if (mouseX > cnvX+pad && mouseX < cnvX + cnvW - pad && mouseY > cnvY + cnvH - 300 + pad && mouseY < cnvY + cnvH - 300 + innerPad*2 + tSize){
        chooseA();
    }
    //選B
    else if (mouseX > cnvX+pad && mouseX < cnvX + cnvW - pad && mouseY > cnvY + cnvH - 300 + pad*2 + innerPad*2 + tSize && mouseY < cnvY + cnvH - 300 + pad*2 + innerPad*2*2 + tSize*2){
        chooseB();
    }
    //選C
    else if (mouseX > cnvX+pad && mouseX < cnvX + cnvW - pad && mouseY > cnvY + cnvH - 300 + pad*3 + innerPad*2*2 + tSize*2 && mouseY < cnvY + cnvH - 300 + pad + innerPad*2*2*2 + tSize*3){
        chooseC();
    }
}

function mouseMoved(){
    if (mouseX > cnvX+pad && mouseX < cnvX + cnvW - pad && mouseY > cnvY+cnvH-300+pad && mouseY < cnvY+cnvH - pad ){
        cursor('pointer');
    }
    else{
        cursor('default')
    }
}

function chooseA(){
    console.log("A");
    //判斷現在的A，計算分數和update下一個ABC
    if(A=="我調查了您的訂單紀錄，訂單跟您平時的一樣，可能是您的錯覺。"){
        A="您的問題我們會再跟外送員跟餐廳做反應，不知道您的餐點是否安好？";
        B="對於您的問題，我們會再告知外送員的。"
        C="好的，食物應該沒事吧？"
        updateDialog("塑膠袋沒裝好，東西都歪一邊。");
    }

    //...
}

function chooseB(){
    console.log("B");
}

function chooseC(string){
    console.log("C");
}