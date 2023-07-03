const dice = document.querySelector('.dice');
const player1Score = document.querySelector('.player1-score');
const player2Score = document.querySelector('.player2-score');
const player1Current = document.querySelector('.player1-current');
const player2Current = document.querySelector('.player2-current');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const rolldice = document.querySelector('.rolldice');
const diceHold = document.querySelector('.dicehold');
const newGame = document.querySelector('.newgame');
const playOk = document.querySelector('.play-ok');
const skipOk = document.querySelector('.play-skip');
const modalClose = document.querySelector('.modal-cl');
const player1Name = document.getElementById('player1');
const player2Name = document.getElementById('player2');
const playAgain = document.querySelector('.play-again');
const playNewGame = document.querySelector('.new-game');
const winnedPlayer = document.querySelector('.winned-player');
const exitButton = document.querySelector('.exit-button');

const errplayer1 = document.querySelector('.errplayer1');

const errplayer2 = document.querySelector('.errplayer2');

player1Name.addEventListener('change',()=>{
    if(!player1Name.value.trim()=='')
    {
        if(!errplayer1.classList.contains('err-hide'))
            errplayer1.classList.add('err-hide');
    }
    else{
        if(errplayer1.classList.contains('err-hide'))
            errplayer1.classList.remove('err-hide');
    }
})

player2Name.addEventListener('change',()=>{
    if(!player2Name.value.trim()=='')
    {
        if(!errplayer2.classList.contains('err-hide'))
            errplayer2.classList.add('err-hide');
    }
    else{
        if(errplayer2.classList.contains('err-hide'))
            errplayer2.classList.remove('err-hide');
    }
})


const startNewGameNo = document.querySelectorAll('.new-start-game-no');

const startNewGameOk = document.querySelector('.new-start-game-ok');


const existOk = document.querySelector('.exit-ok');

const existNo = document.querySelectorAll('.exit-no');




let player1ScoreValue = 0;
let player2ScoreValue = 0;
let player1CurrentValue = 0;
let player2CurrentValue = 0;
let player1NameValue = "";
let player2NameValue = "";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


const winStatus = () => {
    document.querySelector('.modal-win').classList.remove('win-hide');
    document.querySelector('.overlay').classList.remove('form-hide');
}

const playagain = () => {
    player1ScoreValue = 0;
    player1Score.textContent = player1ScoreValue;
    player2ScoreValue = 0;
    player2Score.textContent = player2ScoreValue;
    player1CurrentValue = 0;
    player1Current.textContent = player2CurrentValue;
    player2CurrentValue = 0;
    player2Current.textContent = player2CurrentValue;
    if (!player1.classList.contains('act')) {
        player1.classList.add('act');
        player2.classList.remove('act');
    }
    player1Name.value = '';
    player2Name.value = '';
    //  winStatus.textContent='';
    // diceHold.removeAttribute('disabled');
    // rolldice.removeAttribute('disabled');
    dice.setAttribute('src', '');
}

const rolltheDices = () => {
    let randice = Math.floor(Math.random() * 6) + 1;
    dice.setAttribute('src', `img/dice-${randice}.png`);
    if (player1.classList.contains('act')) {
        if (randice !== 1) {
            player1CurrentValue += randice;
            player1Current.textContent = player1CurrentValue;
            if ((player1ScoreValue + player1CurrentValue) >= 100) {
                winStatus();
                winnedPlayer.textContent = `${player1NameValue} win's with ${player1ScoreValue + player1CurrentValue} points`;
                // rolldice.setAttribute('disabled', '');
                // diceHold.setAttribute('disabled', '');
                // player1Score.textContent = player1ScoreValue + player1CurrentValue;
                // player1Current.textContent = 0;
            }
        }
        else {
            player1CurrentValue = 0;
            player1Current.textContent = player1CurrentValue;
            holdDice();
        }
    }
    else {
        if (randice !== 1) {
            player2CurrentValue += randice;
            player2Current.textContent = player2CurrentValue;
            if ((player2ScoreValue + player2CurrentValue) >= 100) {
                winStatus();
                winnedPlayer.textContent = `${player2NameValue} win's with ${player2ScoreValue + player2CurrentValue} points`;
                // rolldice.setAttribute('disabled', '');
                // diceHold.setAttribute('disabled', '');
                // player2Score.textContent = player2ScoreValue + player2CurrentValue;
                // player2Current.textContent = 0;
            }
        }
        else {
            player2CurrentValue = 0;
            player2Current.textContent = player2CurrentValue;
            holdDice();
        }
    }
}
const holdDice = () => {
    if (player1.classList.contains('act')) {
        player1.classList.remove('act');
        player2.classList.add('act');
        player1ScoreValue += player1CurrentValue;
        player1CurrentValue = 0;
        player1Current.textContent = player1CurrentValue;
        player1Score.textContent = player1ScoreValue;
    }
    else {
        player1.classList.add('act');
        player2.classList.remove('act');
        player2ScoreValue += player2CurrentValue;
        player2CurrentValue = 0;
        player2Current.textContent = player2CurrentValue;
        player2Score.textContent = player2ScoreValue;
    }
}

diceHold.addEventListener('click', holdDice);

rolldice.addEventListener('click', rolltheDices);



modalClose.addEventListener('click', () => {
    document.querySelector('.modal-rules').classList.add('hide-rules');
    document.querySelector('.modal-form').classList.remove('form-hide');
})

playOk.addEventListener('click', () => {
    // player1NameValue = player1Name.value;
    // player2NameValue = player2Name.value;
    if (!player1Name.value.trim() == '' && !player2Name.value.trim() == '') {
        player1NameValue = capitalizeFirstLetter(player1Name.value.trim());
        player2NameValue = capitalizeFirstLetter(player2Name.value.trim());
        document.querySelector('.playerName1').textContent = player1NameValue;
        document.querySelector('.playerName2').textContent = player2NameValue;
        document.querySelector('.modal-form').classList.add('form-hide');
        document.querySelector('.overlay').classList.add('form-hide');
    }
    else{
        if(player1Name.value.trim() == '')
        {
          errplayer1.classList.remove('err-hide');

        }
        else
        {
            errplayer2.classList.remove('err-hide');
        }
    }
})

skipOk.addEventListener('click', () => {
    player1NameValue = 'Player 1';
    player2NameValue = 'Player 2';
    document.querySelector('.modal-form').classList.add('form-hide');
    document.querySelector('.overlay').classList.add('form-hide');
})

playAgain.addEventListener('click', () => {
    document.querySelector('.modal-win').classList.add('win-hide');
    document.querySelector('.overlay').classList.add('form-hide');
    playagain();
})


playNewGame.addEventListener('click', () => {
    document.querySelector('.modal-win').classList.add('win-hide');
    document.querySelector('.modal-form').classList.remove('form-hide');
    playagain();
    document.querySelector('.playerName1').textContent = 'Player 1';
    document.querySelector('.playerName2').textContent = 'Player 2';

})

newGame.addEventListener('click', () => {
    document.querySelector('.overlay').classList.remove('form-hide');
    document.querySelector('.modal-new-start').classList.remove('form-hide');
});

exitButton.addEventListener('click',()=>{
    document.querySelector('.overlay').classList.remove('form-hide');
    document.querySelector('.exit-warning').classList.remove('form-hide');
})

for(let i =0;i<existNo.length;i++)
{
    existNo[i].addEventListener('click',()=>{
        document.querySelector('.overlay').classList.add('form-hide');
    document.querySelector('.exit-warning').classList.add('form-hide');
    })
}


existOk.addEventListener('click',()=>{
    location.reload();
})

startNewGameOk.addEventListener('click',()=>{
    document.querySelector('.modal-new-start').classList.add('form-hide');
    document.querySelector('.modal-form').classList.remove('form-hide');
    playagain();
    document.querySelector('.playerName1').textContent = 'Player 1';
    document.querySelector('.playerName2').textContent = 'Player 2';
})



for(let i =0;i<startNewGameNo.length;i++)
{
    startNewGameNo[i].addEventListener('click',()=>{
        document.querySelector('.overlay').classList.add('form-hide');
        document.querySelector('.modal-new-start').classList.add('form-hide');
    })
}