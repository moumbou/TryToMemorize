
// VARIABLES
var listItem = ["red", "blue", "green", "orange"];
var messageList = ["Good job !", "Nice !", "cool", "yeaaaa", "PERFECT!!", "GOD LIKE", "UNSTOPPABALE", "LEGENDARY", "no comment *_*"];
var randomList = [];
var playerList = [];
var lvl = 1;
var randomCounter = 0;

// START
$(document).on("keypress", function (e){

      randomList = machine(0, lvl);
      $("h1").text("Level " + lvl);
      $(".score").text("");
      $("button").fadeOut();

});

$("button").on("click", function(e){
      randomList = machine(0, lvl);
      $("h1").text("Level " + lvl);
      $(".score").text("");
      $("button").fadeOut();
});

$(".di").on("click", function(e){

    var i = 0;
    playerList = player(e.target.classList[1]);

    while (i < playerList.length) {
      if(playerList[i] === randomList[i]){
        if(playerList.length == randomList.length){
          lvl++;
          setTimeout(function(){
            var randomMessageN = Math.floor(Math.random() * 4);

            if(lvl < 7){
              $("h1").text(messageList[randomMessageN]);
            }else {
              $("h1").text(messageList[randomMessageN + 5]);
            }

            setTimeout(function(){
              $("h1").text("Level " + lvl);
              randomList = machine(0, lvl);
            }, 1000);
          }, 500);
          break;
        }
        }else {
          overGame();
        }
      i++;
    }
});

// CONSOLE COUNTER
function machine(i, lvl){

  if(i < lvl){
    setTimeout(function(){

        randomCounter = Math.floor(Math.random() * 4);



        playSound(listItem[randomCounter]);

        $("." + listItem[randomCounter]).css("border-color", "white");
        $("." + listItem[randomCounter]).css("opacity", "0.33");
        setTimeout(function (){
          $("." + listItem[randomCounter]).css("border-color", "black");
          $("." + listItem[randomCounter]).css("opacity", "1");
        }, 100);

        randomList.push(listItem[randomCounter]);
        i++;
        machine(i, lvl);

    }, 700);

  }
    return randomList;
}

// PLAYER COUNTER
function player(e){

    playerList.push(e);

    playSound(e);
    $("." + e).css("border-color", "white");
    $("." + e).css("opacity", "0.33");
    setTimeout(function (){
      $("." + e).css("border-color", "black");
      $("." + e).css("opacity", "1");
    }, 100);

  return playerList;
}

// PLAY SOUND FUNCTION
function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

// GAME OVER
function overGame(){
  playSound("wrong");
  $(".score").text("Your score is " + lvl);
  lvl = 1;
  $("h1").text("Close ! Try again by pressing any key");
  randomList = [];
  playerList = [];
  $("button").fadeIn().text("Restart");
}
