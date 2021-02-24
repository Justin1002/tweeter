$(document).ready(function() {
  $('#tweet-text').on('input',function() {

  const input = $(this);
  const len = input.val().length;
  const charactersLeft = 140 - len;
  const counter = input.parent().find('.counter');
  counter.text(charactersLeft);
  
  if (charactersLeft < 0) {
    counter.addClass('counter-red');
  }
  else {
    counter.removeClass('counter-red');
  }
 })
});

