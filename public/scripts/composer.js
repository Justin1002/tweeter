$(document).ready(function() {

  //-- Dynamic character count on tweet --//
  $('#tweet-text').on('input',function() {
    const textArea = $(this);
    characterCounter(textArea);
  });

});


// Character counter validation
const characterCounter = function(input) {

  const len = input.val().length;
  const charactersLeft = 140 - len;
  const counter = input.parent().find('.counter');
  counter.text(charactersLeft);

  if (charactersLeft < 0) {
    counter.addClass('counter-red');
  } else {
    counter.removeClass('counter-red');
  }

};
