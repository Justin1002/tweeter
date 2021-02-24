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

  const toggleButton = $('#toggle-up')

  $(window).scroll (function() {

    const navBar = $('.nav-container')

    if($(window).scrollTop() > 300) {
      toggleButton.addClass('show')
      navBar.addClass('hide-nav')
    } else {
      toggleButton.removeClass('show')
      navBar.removeClass('hide-nav')
    }
  })
  
  toggleButton.on('click', function(event) {
    event.preventDefault()

    const tweetContainer = $(this).closest('body').find('#new-tweet')
    const textObject = $(this).closest('body').find('#tweet-text')

    $('html, body').animate({scrollTop:0},200);
    tweetContainer.slideDown()
    textObject.focus()
  })

});

