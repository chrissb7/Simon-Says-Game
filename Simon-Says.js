let order = [];             //Array to hold randomly generated colours.
let playerGo = [];          //Array that takes in the input of the players button colour choices.
let highestScore = 0;       //Keeps track of highscore i.e. the player with the most guessed sequences.
let flashColour2;           //Used as a global variable in order allow flash of lights if game restarts or ends due to wrong clicked button.
let setColour2;             //Used as a global variable in order allow flash of lights if game restarts or ends due to wrong clicked button.
let countDown;              //Stores for the setInterval(reset, 5000+time2); for the countdown method (see below). 
let flash = 0;              //Keeps track of how many flashes should be implemented on each sequence (turn)
let turn = 0;               //Keeps track of turn and used within sequence method to track when the lights should speed up
let colourCheck = 0;        //Holds the value for checking the arrays against each other in the checkColour method e.g. array[colourCheck]===array[colourCheck]
let turnGo = false;         //Boolean that comes on within sequence method, after the sequence is done. If false user can't press on buttons. Resets to false upon game ending.
// let buttonGo = false;      Boolean that was supposed to be used to track when the game should reset if there is a 5 second delay between buttons.
let start = false;          //Boolean used in the eventlistener for the startButton of the game. 
let tickTock = false;       //Turns true in sequence method and begins countdown method
let time = 2000;            //Value used for the sequence method, value changes after 5th, 9th & 13th turn
let time2=0;                //Variable that stores time needed for the countdown method to work. Stores whatever the time is above + 5000ms.
let go=0;                   //An incrementer used in the addOne method.

//Please note any CSS styling features that have been referenced from a source are within the CSS style sheet

const statusButton = document.querySelector("#statusLight"); //Light for status
const green = document.querySelector("#greenCircle");       //Green button
const red = document.querySelector("#redCircle");           //Red button
const yellow = document.querySelector("#yellowCircle");     // Yellow button
const blue = document.querySelector("#blueCircle");         //Blue button
const startButton = document.querySelector("#start");       //Start button


startButton.addEventListener('click', (event) => { //Event handler to listen to when start button clicked
  if (start == false)
  {  
    start = true;
    tickTock=true;
    
    statusButton.style.background = "green";    //Turn button green when start button clicked
    
    setTimeout(function(){ play(); }, 3000);    //Execute game after 3 seconds (play function below)
    
  }
}); //End of StartButton event handler. 

  
function play(){                          //function always when game starts or if there has been a successful turn
    turn++;                              //Global turn value is incremented, this will increment whenever play is called. 
    flash ++                            //Global flash valueis incremented, this will increment whenever play is called. 
    
    for (var i = 0; i < flash; i++) {  //Loop will increment up to whatever the flash value.
      
    var colours = ["blue", "red", "green", "yellow"]; //array of colours to be randomised
    var colour = colours[(Math.floor(Math.random()*colours.length))]; //Colours randomised 
     
     order.push(colour);            //Colours pushed to order array. How many colours are pushed to the Array is dependent on what flash is incremented upto.
                                    //flash is equal to turn and in this way there will be as many flashes as there are turns e.g. 3rd turn would mean 3 colours pushed to the array    
    }     
        sequence();                 //Sequence function is called to "flash" the elements that are in the order array
        console.log(order); 
} //End of start button event handler

function sequence() {

    
   
    if(turn>5){             //Following 3 if statements speed the time up depending on the global turn value
        time=2500*0.75;
    }

    if (turn>9){
        time=2500*0.50;
    }

    if (turn>13){
        time=2500*0.25;
    }

    //REFERENCE: www.stackoverflow.com: https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop/44476626 
    //Code was repurposed from question about delay for Javscript loop. Specifically the answer from Daniel Vassallo.
    
    for (let i = 0; i < flash; i++) {
    setTimeout(function timer() {   //Loop makes the colours in the game "flash" by setting a timeout which will stop all the flashes happening at once. Functions in if statements immediatly below.
    if (order[i] == "blue") 
    {blueGlow();}
    
    if (order[i] == "red") 
      {redGlow();}
    
    if (order[i] == "yellow") 
      {yellowGlow();}
    
    if (order[i] == "green") 
      {greenGlow();}
        }, i * time);            //time value is dependent on what i is in the loop multiplying the time so the 2nd element for example, would begin 1 second after.
       time2 =i*time;            //time2 value is used for the countdown and stores the time of the current flash execution time above .
      }
      
      setTimeout(function delay() {  
      turnGo=true; }, time2);              //turnGo is turned true in anticipation of event handler for buttons becoming active after the play function and sequence function are executed.       
                                           //Will not turn true until sequence is done. 

    
      countdown();                 //Function is used to execute a restart of the game if there is a 5 second wait for a button to be pressed. See below method for more information.
    
                                 // finalCountDown(); CALL OF FUNCTION WAS ATTEMPT 5 SECOND INTERVAL BETWEEN BUTTON PRESSES, SEE BELOW. NO SUCCESS WITH THIS.
    
} //End of Sequence function
       

//Functions below are for Sequence to activate through loop. Each function flashes a colour in the game for half a second when called.

function redGlow() {
    red.style.background = "red";
    setTimeout(() => {
      red.style.background = "radial-gradient(ellipse at 40px 10px , #ffffff 0%, #fff 5%, #d53e2d 100%)";
    }, 500);//lights up element for a second
  }


function blueGlow() { //activates blue glow
    blue.style.background = "blue";
      setTimeout(() => {
        blue.style.background = "radial-gradient(ellipse at 40px 10px , #ffffff 0%, #fff 5%, #4ca9f0 100%)";
      }, 500); //lights up element for half a second
    }
  

function yellowGlow() { //activates yellow glow
    yellow.style.background = "yellow";
    setTimeout(() => { 
      yellow.style.background = "radial-gradient(ellipse at 40px 10px , #ffffff 0%, #fff 5%, #ddff00 100%)";
    }, 500); //lights up element for a half a second
  }



function greenGlow() { //activates green glow
    green.style.background = "green";
    setTimeout(() => { 
      green.style.background = "radial-gradient(ellipse at 40px 10px , #ffffff 0%, #fff 5%, #00ff00 100%)";
    }, 500); //lights up element for half a second
  }


///////////////////////////////////////////////////USER INPUT EVENT HANDLERS////////////////////////////////////

//The following 4 event handlers are used for button pressing. As per the turnGo boolean being turned on in the sequence function the pressing of a button will execute the else if statements

//If a button is clicked (when turnGo is true) then the corresponding value is passed, as a parameter, into a checkColour function e.g. press red button the word "red" is passed.

red.addEventListener('click', (event) =>{ //if red button pressed then execute function

if (turnGo==false){
    alert("Please click start to have a go!")
}

else if (turnGo==true){
checkColour("red");

}

});//End of red button click


blue.addEventListener('click', (event) =>{ //if blue button pressed then execute function

    if (turnGo==false){
        alert("Please click start to have a go!")
    }
    
    else if (turnGo==true){
    checkColour("blue");
    
    }
    
    });//End of blue button click


 yellow.addEventListener('click', (event) =>{ //if yellow button pressed then execute function

        if (turnGo==false){
            alert("Please click start to have a go!")
        }
        
        else if (turnGo==true){
        checkColour("yellow");
        
        }
        
        });//End of yellow button click

    
green.addEventListener('click', (event) =>{ //if green button pressed then execute function

            if (turnGo==false){
                alert("Please click start to have a go!")
            }
            
            else if (turnGo==true){
            checkColour("green");
            
            }
            
            });//End of green button click


///////////////////////////////////////////////////////////////////////////////////////////////////////



function checkColour(colour){           //checkColour will check if the string passed e.g. "red" matches the element in the array colour check is on.

    if (order[colourCheck]== colour){  //For example the 1st go in a new game colourCheck value is 0 and this is used to access the order array and check if [0] matches the colour e.g. "red"

     colourCheck++;                    //colourCheck increments everytime there is a successful match between  order[colourCheck]== colour
     playerGo.push(colour);            //This colour is pushed to the playerGo array which keeps track of the successful inputs of the game player 
     
     tickTock=false;                   /*tickTock being set to false and the following if statement clears the countDown global variable and 
                                            thus the countdown() stops from sequence cancelling the automatic restart after 5 seconds */
    if (tickTock==false){
    clearInterval(countDown); 
    time2=0;
    }                     
        if (playerGo.length===order.length){  //Nested if statement that checks that if the element passed from a button click is the last playerGo element match -
            colourCheck=0;                    // up with the last element of the  order array. If so, the respective fields are emptied 
            playerGo=[];
            order=[];
            addOne();
            turnGo = false;                 
            play();            
        }

    } //end of nested if statement

     else                                   //else statement if the colour passed to to the function does not match up with the colour in the order array
    {
        tickTock=false;                     //tickTock statement as above to stop the 5 second countdown after sequence is executed
        if (tickTock==false){
           clearInterval(countDown); 
           time2=0;
        }
       restart();                           //restart() is executed. See below for detail.
       flashSequence();                     //flashSequence() makes buttons flash at the same time for 5 seconds.
        
    }
}//end of check function



//functions to empty all contents and restart & reset the game. 

function restart() { 

    start=false;
    flash = 0;
    turn = 0;
    turnGo =false;
    playerGo=[];
    order=[];
    go=0;
    document.getElementById('score').innerHTML=0;
    statusButton.style.background = "red"; 
    
}

function reset(){
    start=false;
    flash = 0;
    turn = 0;
    go=0;
    turnGo=false;
    playerGo=[];
    order=[];
    document.getElementById('score').innerHTML=0;
    statusButton.style.background = "red"; 
    flashSequence();  

}


 function countdown (){                                 //countdown() executes once tickTock is set true (in sequence function). An interval for the reset() to be executed is initialised.
    if(tickTock==true){                                 //The time set is as so because the time of the sequence() must be considered as well and time for this is added on top of the 5 seconds.
        countDown = setInterval(reset, 5000+time2);     //This way the 5 second countdown begins after the sequence() is executed.
    
        setTimeout(() => { 
        clearInterval(countDown); 
        
        }, 5000+time2);
    
        } 

     }  


function flashSequence(){                           //flashSequence() is a function that will execute in the restart and reset functions. An interval has been set to execute one function at 0.5 seconds and -
                                                    // the other after 1 second. This gives the "flashing" effect. A timeout is set after 5 seconds.
  
    flashColour2 = setInterval(flashColour, 500);
    setColour2 = setInterval(setColour, 1000);
    
    flashColour();
    setColour();

    setTimeout(() => { 
    clearInterval(flashColour2); 
    clearInterval(setColour2); 
    }, 5000);

}//end of Flash sequence


                                        //Functions for flash sequence to execute. flashColour2 & setColour2 uses the below to switch e.g. blue alternates between blue and the blue.style.background in setColour().
function flashColour(){
    green.style.background = "green";
    blue.style.background = "blue";
    red.style.background = "red";
    yellow.style.background = "yellow";

   }

function setColour(){
    green.style.background = "radial-gradient(ellipse at 40px 10px , #ffffff 0%, #fff 5%, #00ff00 100%)";
    blue.style.background = "radial-gradient(ellipse at 40px 10px , #ffffff 0%, #fff 5%, #4ca9f0 100%)"; 
    red.style.background = "radial-gradient(ellipse at 40px 10px , #ffffff 0%, #fff 5%, #d53e2d 100%)";
    yellow.style.background = "radial-gradient(ellipse at 40px 10px , #ffffff 0%, #fff 5%, #ddff00 100%)";;
   }

   function addOne(){                               //addOne() is a function used to keep track of the score i.e. how many successful turn have there been and if there is a new record for most-
                                                    //successful turns then this is set on the game highestScore div tag in the html. go is a global variable incremented each successful turn.
    go++;
    document.getElementById('score').innerHTML=go;

    if(go>highestScore){
    highestScore=go;
    document.getElementById('highestScore').innerHTML=highestScore;
    }
}

// function finalCountDown (){
    
//     if (buttonGo==false){

//         countDown = setInterval(reset, 5000+time2);
        
//         setTimeout(() => { 
//         clearInterval(countDown); 
            
//         }, 5000+time2);
        
//         }
          
//      }  FUNCTION TO IMPLEMENT 5 SECOND LIMIT BETWEEN BUTTON PRESSES