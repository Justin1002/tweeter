$(document).ready(function() {

  //-- Dynamic character count on tweet --//

  $('#tweet-text').on('input',function() {

    const input = $(this);
    const len = input.val().length;
    const charactersLeft = 140 - len;
    const counter = input.parent().find('.counter');
    counter.text(charactersLeft);

    if (charactersLeft < 0) {
      counter.addClass('counter-red');
    } else {
      counter.removeClass('counter-red');
    }
  });

  //-- button function to toggle to the top of the page--//

  const toggleButton = $('#toggle-up');

  $(window).scroll(function() {

    const navBar = $('.nav-container');
  
    //Show toggle button, and hide nav button when page is 100px scrolled vertically
    if ($(window).scrollTop() > 100) {
      toggleButton.addClass('show');
      navBar.addClass('hide-nav');
    } else {
      toggleButton.removeClass('show');
      navBar.removeClass('hide-nav');
    }
  });
  

  //On click, animate the scrolling to the top, open the new tweet section, and focus the text area
  toggleButton.on('click', function(event) {
    event.preventDefault();

    const newTweetContainer = $(this).closest('body').find('#new-tweet');
    const textObject = $(this).closest('body').find('#tweet-text');

    $('html, body').animate({scrollTop:0},200);
    newTweetContainer.slideDown();
    textObject.focus();
  });


  //--Navigation button functionality--//
  
  const navButton = $('.btn-tweet');
  navButton.on('click', function() {

    const newTweetContainer = $(this).closest('body').find('#new-tweet');
    const textObject = $(this).closest('body').find('#tweet-text');
    const tweetsContainer = $(this).closest('body').find('#tweet-container')

    if (newTweetContainer.css('display') === 'none') {
      newTweetContainer.slideDown();
      tweetsContainer.removeClass('topMargin');
      textObject.focus();
      
    } else {
      newTweetContainer.slideUp();
      tweetsContainer.addClass('topMargin');
    }

  });

});

