var answer = Math.floor((Math.random() * 100) + 1);
var $help = $('.help');
var $form = $('form');
var $input = $('input');
var $submitButton = $('.submit');
var $response = $('.response');
var $cheat = $('.cheat');
var $reset = $('.reset');

$help.hide();

$form.submit(function(e) {
  if (parseInt($input.val()) === answer) {
  	e.preventDefault();
  	$response.text('correct!');
  } else {
  	e.preventDefault();
  	$response.text('incorrect...');
  }
});

$cheat.click(function(e) {
	e.preventDefault();
	alert(answer);
});

$reset.click(function(e) {
	e.preventDefault();
	answer = Math.floor((Math.random() * 100) + 1);
});

// validate input
   // spaces, blank guess, letters
// no repeating
// getting hotter or colder
   // too high
   // too low
// track the user's previous guess to let them if they getting hotter or colder
// animations using jQuery

// If you get stuck... 
// http://philiplang.github.io/HuckleBuckle/index.html
// http://raddevon.github.io/huckle-buckle-beanstalk/