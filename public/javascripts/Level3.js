// let dialogs = []; //儲存已存在的對話框們
let scores = 0; //紀錄分數
let start=true; //紀錄是否為初始值
let missionClear=false; //紀錄是否完成關卡
let count=true;//false代表是最後一則訊息，要加分
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
let D="這是外送員的問題，我沒有辦法幫您處理。",E="好的，我們會退費，並幫您盡速處理。",F="我不確定這要怎麼處理...... ";
let G=" 對於這部分，可能是您的錯覺...... ",H="外送員送貨總是會有些意外，還請您多擔待。",I="非常抱歉，外送員遲到導致您的餐點涼掉了，這裡會附上折價券作為補償。";
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
    tColor=black;

    //按照字數產生(字數*N)寬度的對話方框並把之前累積的方框移動上去，發送者是外送員的話靠左，反之靠右
    //dialog長寬需動態按字數算，x固定 y累計算，因應對話有可能會有複數行。
    //text的X也是固定，y累計算。複數行另有計算方式。

    if(missionClear){
        //畫外送員回覆
        dialogW = string.length*20 + innerPad*2;
        textX = pad + innerPad;
        textY = pad + innerPad;
        drawDialog(pad,pad,dialogW,dialogH, delieverColor);
        stroke(tColor);
        strokeWeight(0.5);
        fill(tColor);
        text(string,textX,textY);

        console.log(`You get ${scores} points.`);

        if(scores>=80) {
            string = '沒有，謝謝你(客戶已離開)';
        }
        else if(scores<80 && scores>60) {
            string = '沒有。(客戶已離開)';
        }
        else {
            string = '(客戶已離開)';
        }
        //畫出客人回答
        dialogW = string.length*tSize + innerPad*2;
        dialogH = tSize + innerPad *2;
        drawDialog(cnvX+cnvW-dialogW-pad, pad+dialogH, dialogW, dialogH, customerColor);
        stroke(tColor);
        strokeWeight(0.5);
        fill(tColor);
        textX = cnvX + cnvW - dialogW - pad +innerPad;
        textY = pad +innerPad + dialogH;
        text(string, textX, textY);
    }

    else{
        dialogW = string.length*tSize + innerPad*2;
        dialogH = tSize + innerPad *2;
        drawDialog(cnvX+cnvW-dialogW-pad, pad, dialogW, dialogH, customerColor); //繪製對話框
        stroke(tColor);
        strokeWeight(0.5);
        fill(tColor);
        textX = cnvX + cnvW - dialogW - pad +innerPad;
        textY = pad+innerPad
        text(string, textX, textY); //掛上字
        updateChoice();
    }




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
    //press之後客戶繼續抱怨
    //如果第一關沒有完成會出現對話
    // if(){
    //     scores=0;
    //     updateDialog("我的餐點訂單很奇怪，怎麼會這樣？");
    //
    // }
    //如果第二關沒有限時內送達
    // if(){
    //     scores=0;
    //     updateDialog("我的餐點涼了，我要賠償。");
    //
    // }
    //正常出現
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
    //第一關沒有完美達成出現，可能還要再加一個條件判斷第一關是否有出現
    // if(D=="這是外送員的問題，我沒有辦法幫您處理。"){
    //     score+=5;
    //     D="我認為這是外送員的問題，您應該找外送員做處理。";
    //     E="呃... 這應該是你自己的問題，你應該一開始就跟外送員講。";
    //     F="非常抱歉，再麻煩您拍照佐證，我們會盡速幫您處理。";
    //     updateDialog("而且還缺東缺西的，到底是怎麼回事？");
    //     //最後一則訊息都要加
    //     count=false;
    //     if(count==false) scores+=5;
    //
    // }
    //第二關沒有時限內送達，可能還要再加一個條件判斷第二關是否有出現
    // if(G=="對於這部分，可能是您的錯覺......"){
    //     scores+=0;
    //     G="預估時間是僅供參考的，這點就只能麻煩您多擔待了...！";
    //     H="對於這個部份我們深感抱歉，還請您多擔待。";
    //     I="這方面我們是無法控制的，真是抱歉。";
    //     updateDialog("而且我等得有夠久，完全不懂預估時間是用來做什麼的！");
    //     //最後一則訊息都要加
    //     count=false;
    //     if(count==false) scores+=5;
    //
    // }
    //判斷現在的A，計算分數和update下一個ABC
    if(A=="我調查了您的訂單紀錄，訂單跟您平時的一樣，可能是您的錯覺。"){
        scores+=0;
        A="您的問題我們會再跟外送員跟餐廳做反應，不知道您的餐點是否安好？";
        B="對於您的問題，我們會再告知外送員的。"
        C="好的，食物應該沒事吧？"
        updateDialog("塑膠袋沒裝好，東西都歪一邊。");
    }
    else if(A=="您的問題我們會再跟外送員跟餐廳做反應，不知道您的餐點是否安好？"){
        scores+=10;
        A="有關外送員態度不好的情況，還請您提出證明。";
        B="有關外送員態度不好的情況，我們會再做提醒。";
        C="好有關外送員態度不好的情況，我們會嚴厲糾正，請您放心";
        updateDialog("外送員態度很差，讓我心情好不好！");

    }
    else if( A=="有關外送員態度不好的情況，還請您提出證明。"){
        scores+=0;
        A="不好意思造成您的不開心，我們會立刻糾正該名外送員在上班時間抽菸的行為。";
        B="外送員抽菸屬於個人行為，與外送平台沒有任何的關係。";
        C="有關外送員抽菸的行為，我們會再做確認，謝謝提醒。";
        updateDialog("外送員會抽菸，感覺很臭很不衛生。");
    }
    else if (A=="不好意思造成您的不開心，我們會立刻糾正該名外送員在上班時間抽菸的行為。"){
        //最後一則訊息都要加
        missionClear = true;
        scores+=10;
        updateDialog("請問還有其他問題嗎？");
    }
}

function chooseB(){
    console.log("B");
    //第一關沒有完美達成出現，可能還要再加一個條件判斷第一關是否有出現
    // if( E=="好的，我們會退費，並幫您盡速處理。"){
    //     scores+=10;
    //     D="我認為這是外送員的問題，您應該找外送員做處理。";
    //     E="呃... 這應該是你自己的問題，你應該一開始就跟外送員講。";
    //     F="非常抱歉，再麻煩您拍照佐證，我們會盡速幫您處理。";
    //     updateDialog("而且還缺東缺西的，到底是怎麼回事？");
    //     //最後一則訊息都要加
    //     count=false;
    //     if(count==false) scores+=0;
    //
    // }
    //第二關沒有時限內送達，可能還要再加一個條件判斷第二關是否有出現
    // if(H=="外送員送貨總是會有些意外，還請您多擔待。"){
    //     scores+=5;
    //     G="預估時間是僅供參考的，這點就只能麻煩您多擔待了...！";
    //     H="對於這個部份我們深感抱歉，還請您多擔待。";
    //     I="這方面我們是無法控制的，真是抱歉。";
    //     updateDialog("而且我等得有夠久，完全不懂預估時間是用來做什麼的！");
    //     //最後一則訊息都要加
    //     count=false;
    //     if(count==false) scores+=10;
    // }
    //判斷現在的B，計算分數和update下一個B
    if(B=="好的，我會再向餐廳反映您的用餐體驗，不知道可否請您再詳細描述餐點？"){
        scores+=10;
        A="您的問題我們會再跟外送員跟餐廳做反應，不知道您的餐點是否安好？";
        B="對於您的問題，我們會再告知外送員的。"
        C="好的，食物應該沒事吧？"
        updateDialog("塑膠袋沒裝好，東西都歪一邊。");
    }


    else if(B=="對於您的問題，我們會再告知外送員的。"){
        scores+=5;
        A="有關外送員態度不好的情況，還請您提出證明。";
        B="有關外送員態度不好的情況，我們會再做提醒。";
        C="好有關外送員態度不好的情況，我們會嚴厲糾正，請您放心";
        updateDialog("外送員態度很差，讓我心情好不好！");
    }


    else if(B=="有關外送員態度不好的情況，我們會再做提醒。"){
        scores+=5;
        A="不好意思造成您的不開心，我們會立刻糾正該名外送員在上班時間抽菸的行為。";
        B="外送員抽菸屬於個人行為，與外送平台沒有任何的關係。";
        C="有關外送員抽菸的行為，我們會再做確認，謝謝提醒。";
        updateDialog("外送員會抽菸，感覺很臭很不衛生。");
    }
    else if (B=="外送員抽菸屬於個人行為，與外送平台沒有任何的關係。"){
        //最後一則訊息都要加
        missionClear = true;
        scores+=0;
        updateDialog("請問還有其他問題嗎？");
    }
}

function chooseC(string){
    console.log("C");
    //第一關沒有完美達成出現，可能還要再加一個條件判斷第一關是否有出現
    // if( F==" 我不確定這要怎麼處理...... "){
    //     scores+=0;
    //     D="我認為這是外送員的問題，您應該找外送員做處理。";
    //     E="呃... 這應該是你自己的問題，你應該一開始就跟外送員講。";
    //     F="非常抱歉，再麻煩您拍照佐證，我們會盡速幫您處理。";
    //     updateDialog("而且還缺東缺西的，到底是怎麼回事？");
    //     //最後一則訊息都要加
    //     count=false;
    //     if(count==false) scores+=10;
    // }
    //第二關沒有時限內送達，可能還要再加一個條件判斷第二關是否有出現
    // if(I=="非常抱歉，外送員遲到導致您的餐點涼掉了，這裡會附上折價券作為補償。"){
    //     scores+=10;
    //     G="預估時間是僅供參考的，這點就只能麻煩您多擔待了...！";
    //     H="對於這個部份我們深感抱歉，還請您多擔待。";
    //     I="這方面我們是無法控制的，真是抱歉。";
    //     updateDialog("而且我等得有夠久，完全不懂預估時間是用來做什麼的！\n");
    //     //最後一則訊息都要加
    //     count=false;
    //     if(count==false) scores+=0;
    // }
    //判斷現在的C，計算分數和update下一個C
    if(C=="不好意思，這點可能得待我們向餐廳詢問，畢竟您這邊是個案，我們沒有收到類似的訊息"){
        scores+=5;
        A="您的問題我們會再跟外送員跟餐廳做反應，不知道您的餐點是否安好？";
        B="對於您的問題，我們會再告知外送員的。";
        C="好的，食物應該沒事吧？";
        updateDialog("塑膠袋沒裝好，東西都歪一邊。");
    }


    else if(C=="好的，食物應該沒事吧？"){
        scores+=0;
        A="有關外送員態度不好的情況，還請您提出證明。";
        B="有關外送員態度不好的情況，我們會再做提醒。";
        C="好有關外送員態度不好的情況，我們會嚴厲糾正，請您放心";
        updateDialog("外送員態度很差，讓我心情好不好！");
    }


    else if(C=="好有關外送員態度不好的情況，我們會嚴厲糾正，請您放心"){
        scores+=10;
        A="不好意思造成您的不開心，我們會立刻糾正該名外送員在上班時間抽菸的行為。";
        B="外送員抽菸屬於個人行為，與外送平台沒有任何的關係。";
        C="有關外送員抽菸的行為，我們會再做確認，謝謝提醒。";
        updateDialog("外送員會抽菸，感覺很臭很不衛生。");
   }
    else if (C=="有關外送員抽菸的行為，我們會再做確認，謝謝提醒。"){
        //最後一則訊息都要加
        missionClear = true;
        scores+=5;
        updateDialog("請問還有其他問題嗎？");
    }

}
