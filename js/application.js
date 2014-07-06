// Setting up the right classes to be used througout the UI
var selectedClass = 'fa fa-check';
var unselectedClass = 'fa fa-circle-o';

// Take the user input upon click, and add it as a to-do item in a list
function clickItem() {
    // Grab the value of the user input
    userInput = $("#userInput").val();

    // Make sure there is something to actually add so we don't get a blank item
    if (userInput === '') {
        return;
    // Once we know there's something to add, we can run the rest of the function
    } else {
        // Write the html for the to list item, and throw in the users input as the value of the to-do item
        todoItem = '<li class="to-do-wrapper"><input type="text" class="to-do item" value="' + userInput + '" readonly><span class="userAction submit complete-item"><i class="' + unselectedClass + '"></i></span></li>';
        // Now place it on the page in the right spot
        $(todoItem).appendTo('.to-do-items-wrapper').slideDown(250);
        // Reset the value of the users input to ''
        $("#userInput").val('');
    }
}

// Take the user input upon pressing enter, and add it as a to-do item in a list
function enterItem() {
    // Get the user input, and when there's a key that is pressed, run a function
    $("#userInput").keypress(function(event) {
        // If the key that is press is 'enter'
        if (event.keyCode == 13) {
            event.preventDefault();
            // Add the item
            $(".add").click();
        }
    });
}

// Function to change the styling for when an item is marked complete
function completeItem() {
    $(this).find('.userAction').parent().toggleClass('completed');

    // If the completed class is found, show the fa-check, as opposed to the fa-circle-o
    if ($(this).closest('.to-do-wrapper').hasClass('completed')) {
        $(this).find('.userAction i').removeClass(unselectedClass).addClass(selectedClass);
    } else {
        $(this).find('.userAction i').removeClass(selectedClass).addClass(unselectedClass);
    }

    // If the completed class is found, show the option to delete them, if not, hide the delete trigger
    if ($('.to-do-wrapper').hasClass('completed')) {
        $('.delete-completed').slideDown();
    } else {
        $('.delete-completed').slideUp();
    }
}

// Delete the complete items
function deleteCompleted() {
    // Find the ones that have a completed class and slide them up
    $(this).closest('.wrapper').find('.to-do-items-wrapper').children('.completed').slideUp(function() {
    	$(this).remove();
    });
    // Now hide the delete trigger since there's nothing more to delete
    $('.delete-completed').slideUp();
}

$(document).ready(function() {
    // Event Handlers
    $('#userInput').keydown(enterItem);
    $('.add').click(clickItem);
    $('.delete-completed').on('mouseenter', function() {
    	$('.completed').addClass('about-to-delete');
    });
    $('.delete-completed').on('mouseleave', function() {
    	$('.completed').removeClass('about-to-delete');});
    $('.delete-completed').click(deleteCompleted);
    $('.to-do-items-wrapper').on('click', '.to-do-wrapper', completeItem);
});