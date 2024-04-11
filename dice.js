//selecting the elements
const score0=document.getElementById('score--0');
const score1=document.getElementById('score--1');
const diceEl=document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnHold=document.querySelector('.btn--hold');
const btnRoll=document.querySelector('.btn--roll');
const current0=document.getElementById('current--0');
const current1=document.getElementById('current--1');
const player0=document.querySelector('.player--0');
const player1=document.querySelector('.player--1');

let currentScore,scores,activePlayer,playing;

const init=function(){
    scores=[0,0];
    currentScore=0;
    activePlayer=0;//first play is begun by 0-player
    playing=true;

    current0.textContent=0;
    current1.textContent=0;
    score0.textContent=0;
    score1.textContent=0;

    diceEl.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}

init();


const switchPlayer=function(){
    document.getElementById('current--'+ activePlayer).textContent=0;
        activePlayer=activePlayer===0?1:0;
        currentScore=0;
        player0.classList.toggle('player--active');/*if it is there it removes it , if not it adds*/ 
        player1.classList.toggle('player--active');
}




btnRoll.addEventListener('click', function(){
    if(playing){
    //Generate a dice roll
    diceNum=Math.trunc(Math.random() * 6) +1;
   
    //Display the dice value(remove the css hidden )
    diceEl.classList.remove('hidden');
    diceEl.src='dice-' +diceNum + '.png';


   

    //If 1 , switch the player
    if(diceNum!==1){
        //add diceNum to previous score
        currentScore+=diceNum;
        document.getElementById('current--'+ activePlayer).textContent=currentScore;//
        // yesari it doesnt work raixa ("current"+activePlayer).textContent=currentScore;

    }
    else{
        //switch to next player
        switchPlayer();
        
    }
}
})


//functionality of btnHold

btnHold.addEventListener('click',function(){
    if(playing){
    //1.Add the currentScore to active player's score
    scores[activePlayer]+=currentScore;
    document.getElementById("score--" + activePlayer).textContent=scores[activePlayer];
    //2.Check if player's score is >=100
    if(scores[activePlayer]>=10){
        playing=false;
        diceEl.classList.add('hidden');
        document.querySelector('.player--'+activePlayer).classList.add('player--winner');
        document.querySelector('.player--'+activePlayer).classList.remove('player--active');
    }

    else{
        switchPlayer();
    }
    //FInish the game
    //Switch to the next player
}
})

//reset the game

btnNew.addEventListener('click',init)