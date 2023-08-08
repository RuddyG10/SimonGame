
/*
    Main Code
*/

//Variable declarations
var randomNumber;
var buttonsArray;
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
//Operations
buttonsArray = ["green","red","yellow","blue"];







/*
    JQueries
*/
//Next secuence if the A key is pressed
$(document).on('keypress',function(e){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
    
    
    
});


//Play the sound of the button tha is pressed
$(".btn").on('click',function(){
    var id = $(this).attr("id");
    handlerColor(id);
    animatedPress(id);
    console.log(userClickedPattern);
    playSound(id);
    var lastIndex = userClickedPattern.length -1
    checkAnswer(lastIndex);
    
});

/*
    Functions
*/

//This function returns a number between 0-3
function nextSequence(){
    level++;
    userClickedPattern = [];
    randomNumber = Math.floor(Math.random() *4);
    randomChosenColor = buttonsArray[randomNumber];
    gamePattern.push(randomChosenColor);
    //Select the button depending of the randomChosenColor and flash it

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("h1").text("Level "+level);
}

//For playing sounds

function playSound(color){
    var audio = new Audio('/SimonGame/Simon Game Challenge Starting Files/sounds/'+color+'.mp3');
    audio.play();    
}

function handlerColor(id){
    var userChosenColor = id;
    userClickedPattern.push(id);
}

function animatedPress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}

function checkAnswer(index){
    if(userClickedPattern[index] == gamePattern[index]){
        console.log(userClickedPattern);
        console.log(gamePattern);
        console.log("continue");
        if(userClickedPattern.length == gamePattern.length){
            
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    
    else{
        console.log("wrong");
        var audio = new Audio('/SimonGame/Simon Game Challenge Starting Files/sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press A Key To Restart The Game.");
        startOver();
    }
}

function startOver(){
    started = false;
    
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
}