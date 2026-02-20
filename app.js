//keypress->start game
//game start ->level1->button flash
//user clicks button ->match and move to level 2
//gamesequence and user sequence arrays

let gameSeq=[];
let userSeq=[];
let h2 = document.querySelector("h2");
let started = false;
let level = 0;
let btns=["yellow","red","purple","green"];

document.addEventListener("keypress", function(){
    if(!started){
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 200);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;
    //random button choose
    let rand = Math.floor(Math.random()*3);
    let randcolor = btns[rand];
    let randbtn = document.querySelector(`.${randcolor}`); 
    gameSeq.push(randcolor);

    btnflash(randbtn);
}

function checkAns(idx)
{
    //console.log("current level: "+level);
   
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        console.log("wrong");
        h2.innerHTML = `Game Over!Your score is ${level}.<br> Press any key to start`;

        reset();
    }
}

function reset(){
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}

function buttonPress(){

    let btn = this;
    btnflash(btn);
    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", buttonPress);
}