// Global for initial guess
var answer = Math.floor((Math.random() * 100) + 1);

// Global for previous guess
var previousGuess;

// Global for number of guesses
var numberOfGuesses = 1;

// Validate as normal integer
function isNormalInteger(str) {
    return (/^[1-9]\d*$/).test(str);
}

// Checks to see if the guess is within the parameters given
function validGuess(guess) {
    return isNormalInteger(guess) && +guess <= 100 && +guess >= 1
}

// Compare the guess to the number and previous guess. Place feedback on the page for the player.
function compareGuess(event) {
    event.preventDefault();

    // Grab the guess from the text input field
    var guess = $('#guess').val();
    if (validGuess(guess)) {

        // Turn off any error messages
        $('.help').hide();

        // Increment number of guesses
        numberOfGuesses++;
        if (previousGuess) {

            // Find distances of the current and previous guesses from the actual number
            var previousDistance = Math.abs(answer - previousGuess);
            var currentDistance = Math.abs(answer - guess);

            // Feedback for guess versus previous guess comparison
            if (guess === previousGuess) {
                $('.almost').text("Same guess!");
            } else if (currentDistance < previousDistance){
                $('.almost').text("Getting warmer...").css("color", "red");
            } else if (currentDistance > previousDistance) {
                $('.almost').text("Getting colder...").css("color", "blue");
            } else {
                $('.almost').text("Same distance...");
            }
        }

        // Set new previous guess
        previousGuess = guess;

        // Convert guess value to an integer for comparison
        guess = parseInt(guess, 10);

        // Feedback for a correct guess. Show the reset button to start a new game.
        if (guess === answer) {
            $('.response').text('The number was ' + answer + '.');
            $('.almost').text('');
            if (numberOfGuesses === 1) {
            	$('.almost').text('You got it on the first try!').css("color", "");
            } else {
            	$('.almost').text('You got it in ' + numberOfGuesses + ' guesses.').css("color", "");
            }
        } else if (answer > guess) {
            $('.response').text('Higher than ' + guess + '!');
        } else {
            $('.response').text('Lower than ' + guess + '!');
        }

        // Blank out the guess input field return focus
        $('#guess').val('').focus();
    } else {

        // Give error for invalid guess. Blank out the guess field and return focus.
        $('.help').text('Please enter valid integer between 1 and 100').show();
        $('#guess').val('').focus();
    }
}

// Bind form submission to the compareGuess function
$('form').submit(compareGuess);

// Bind enter key to the compareGuess function for browsers that don't always interpret an enter press as a form submission.
$('#guess').keypress(function(event) {
    if (event.which == 13) {
        compareGuess();
    }
});

// Reveals answer to user
$('.cheat').click(function(e) {
	e.preventDefault();
	alert(answer);
});

// Assigns new hidden answer and empty's input
$('.reset').click(function(e) {
	e.preventDefault();
	location.reload();
});