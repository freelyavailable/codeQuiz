// ON CLICK EVENT FOR START BUTTON TO LOAD A QUESTION AND HIDE THE START BUTTON 
$(".btn-dark").on("click", function() {
    
    // remove button from view 
    $(".card").remove();
    // play theme song
    //$("#theme")[0].play(); 
    // display some text while the "game loads"
    //$(".ready").html("<h1> Get Ready!!</h1>")
    // log to console
    console.log("user clicked start");
    //window.location.href='questions.html';
    // set timeout for theme music so it doesn't play the whole time
    setTimeout(function(){
        quizQuestion.getQuestion()
        //$("#theme")[0].pause(); 
    },0);
    

})

// ON CLICK FOR RESET BUTTON - RESETS GAME
$(".btn-secondary").on("click", function() {
    console.log("user clicked Restart");
    $(".final-page").hide();
    quizQuestion.questionNumber = 0; 
    quizQuestion.correctGuesses = 0; 
    quizQuestion.incorrectGuesses = 0; 
    quizQuestion.timeOuts = 0;  
    quizQuestion.getQuestion(); 
})

// ON CLICK FOR ANSWER BUTTONS
$("#button-display").on("click", ".answerButton", function (e) {
    // answerButton.clicked(e); 
    var selectedAnswer = $(e.target).attr("data-name"); 
    console.log(e); 
    console.log(e.target); 
    console.log(e.target.data);
    console.log($(e.target).attr("data-name")); 
    quizQuestion.checkAnswer(selectedAnswer); 
    // trivia.answerIncorrect(selectedAnswer); 
})


var quizQuestion = {
    // current question
    currentQuestion: "",
    // correct answers 
    correctGuesses: 0,
    // incorrect answers 
    incorrectGuesses: 0,
    // timeouts 
    timeOuts: 0,
    // counter 
    counter: 3,
    counterTimer: null,
    // question number 
    questionNumber: 0,
    // // correct audio
    // yay:  

    // QUESTIONS OBJECT WHICH INCLUDES AN ARRAY OF QUESTIONS
    // Questions from https://www.w3schools.com/quiztest/quiztest.asp?qtest=JavaScript
    questions: [
        {
            // question text
            questionText: "Inside which HTML element do we put the JavaScript?",
            // question answers array
            questionAnswer: ["1.  <scripting>", "2.  <script>", "3.  <js>", "4.  <javascript>"],
            // correct answer 
            answer: "2.  <script>"
        },
        {
            questionText: "Where is the correct place to insert a JavaScript?",
            questionAnswer: ["1.  Both in the <head> section and the <body> section are correct", "2.  The <head> section", "3.  The <body> section", "4.  The <javascript> section"],
            answer: "1.  Both in the <head> section and the <body> section are correct"
        },
        {
            questionText: 'What is the correct syntax for referring to an external script called "xxx.js"?',
            questionAnswer: ['1.  <script name="xxx.js">' , '2.  <script src="xxx.js">' , '3.  <script href="xxx.js">' , '4.  <script call="xxx.js">'],
            answer: '2.  <script src="xxx.js">',
        },
        {
            questionText: 'How do you write "Hello World" in an alert box?',
            questionAnswer: ['1.  msg("Hello World");', '2.  msgBox("Hello World");', '3.  alert("Hello World");', '4.  alertBox("Hello World");'],
            answer: '3.  alert("Hello World");',
        },
        {
            questionText: "How do you create a function in JavaScript?",
            questionAnswer: ["1.  function myFunction[]", "2.  function = myFunction()", "3.  function:myFunction()", "4.  function myFunction()"],
            answer: "2.  function = myFunction()",
        },
        {
            questionText: 'How do you call a function named "myFunction"?',
            questionAnswer: ["1.  call function myFunction()", "2.  call myFunction()", "3.  myFunction()", "4.  function.myFunction()"],
            answer: "3.  myFunction()",
        },
        {
            questionText: "How to write an IF statement in JavaScript?",
            questionAnswer: ["1.  if(i==5)", "2.  if i==5 then", "3.  if i = 5", "4.  if i = 5 then"],
            answer: "1.  if(i==5)",
        },
        {
            questionText: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
            questionAnswer: ["1.  if(i <> 5)", "2.  if i <> 5", "3.  if i =! 5 then", "4.  if (i != 5)"],
            answer: "4.  if (i != 5)",
        },
        {
            questionText: "How does a WHILE loop start?",
            questionAnswer: ["1.  while (i <= 10)", "2.  while i = 1 to 10", "3.  while(i <= 10; i++)", "4.  while i <= 10"],
            answer: "1.  while (i <= 10)",
        },
        {
            questionText: "How can you add a comment in a JavaScript?",
            questionAnswer: ["1.  <!--This is a comment-->", '"2.  This is a comment"', "3.  //This is a comment", "4.  ***This is a comment***"],
            answer: "3.  //This is a comment",
        },
    ], 



    //run: function () {
    //    clearInterval(this.counterTimer); 
    //    this.counterTimer = setInterval(this.decrement, 1000); 
     //   quizQuestion.counter = 10; 
    //}, 
    
    decrement: function () {
        quizQuestion.counter--; 
        //$(".countdown").html(quizQuestion.counter + " seconds left to answer");
        if (quizQuestion.counter === 0) {
            clearInterval(quizQuestion.counterTimer);
            quizQuestion.checkAnswer(); 
        }
        
    }, 
    
    // GET QUESTION METHOD
    getQuestion: function () {
        // clear and hide a bunch of things when the question loads
        $(".question-display").empty(); 
        $(".areYouRight").empty();
        $(".ready").empty();  
        //$(".image-correct").hide ();
        //$(".image-incorrect").hide ();
        //$(".image-timeout").hide();  
        // start the countdown
        //this.run ();
        // display the question on the screen 
        //$(".countdown").html(this.counter + " seconds left to answer"); 
        // display question 
        $(".question-display").html("<p>" + this.questions[this.questionNumber].questionText + "</p>"); 
        this.buttonGenerator();         
    }, 

    //BUTTON GENERATOR METHOD 
    buttonGenerator: function () {
    //empty buttons 
        $("#button-display").empty(); 
        // for loop to display answer buttons on the screen 
        for (var i = 0; i < this.questions[this.questionNumber].questionAnswer.length; i++) {
            var a = $("<button>"); 
            a.addClass("answerButton"); 
            a.attr("data-name", this.questions[this.questionNumber].questionAnswer[i]); 
            a.text(this.questions[this.questionNumber].questionAnswer[i]); 
            $("#button-display").append(a);   
        };
    }, 

    // CHECK IF THE ANSWER IS CORRECT, WRONG, OR IF THE QUESTION TIMED OUT (UNDEFINED) 
    checkAnswer: function (selectedAnswer) {
        //determine if the answer is correct 
        console.log(this.questions[this.questionNumber]); 
        // if the answer is undefined (timeout) 
        //if (selectedAnswer === undefined) {
            // show the timeout message and image and play sound  
        //    $(".areYouRight").html("You ran out of time."); 
        //    $(".image-timeout").show ();
        //    $("#timeout")[0].play(); 
            // next question 
         //   this.questionNumber++; 
            // add to timeout var
         //   this.timeOuts++; 
        //}
        // if the answer matches the correct one
        if (selectedAnswer === this.questions[this.questionNumber].answer) {
            console.log("win");  
            // increment the number correct 
            this.correctGuesses++; 
            console.log (this.correctGuesses);
            // display win message and image and play sound
            $(".areYouRight").html("Correct!"); 
           
            
            // next question 
            this.questionNumber++; 
        }    
        else {
            console.log("lose"); 
            // increment incorrect guess 
            this.incorrectGuesses++; 
            console.log (this.incorrectGuesses);
            // display lose message and image and play sound
            $(".areYouRight").html("Wrong!");
           
           
            // next question   
            this.questionNumber++; 
        }  

        this.answerPage();
            // this.answerPage(); 
    }, 

    //DISPLAY ANSWER PAGE 
    answerPage: function () {
        // clear question-display div, button displat, and countdown divs
        $(".question-display").empty();  
        $("#button-display").empty(); 
        $(".countdown").empty(); 
        // clear countdown
        clearInterval(quizQuestion.counterTimer);
        // check for last question
        setTimeout (function (){
            if (quizQuestion.questionNumber < quizQuestion.questions.length){
                quizQuestion.getQuestion(); 
            }

            else {
                quizQuestion.finalPage(); 
            }
        }, 1000
        )
        
    }, 

    // DISPLAY STATS PAGE WITH FINAL COUNTS AND A RESTART
    finalPage: function () {
        // empty and hide divs
        $(".question-display").empty();  
        $("#button-display").empty(); 
        $(".areYouRight").empty(); 
        $(".image-correct").hide ();
        $(".image-incorrect").hide ();
        $(".final-page").show (); 
        // display messages for correct, incorrect and time out 
        $("#message").html("<h2>You're done! Here are your results:</h2>");
        $("#correct").html("Correct Guesses: " + this.correctGuesses);  
        $("#incorrect").html("Incorrect Guesses: " + this.incorrectGuesses); 
        $("#time-out").html("Time Outs: " + this.timeOuts);
    }

}; 