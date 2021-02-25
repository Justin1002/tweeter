$(document).ready(function() {

  //-- Dynamic character count on tweet --//
  $('#tweet-text').on('input',function() {
    const input = $(this);
    characterCounter(input);
  });


  //-- button function to toggle to the top of the page--//
  $(window).scroll(function() {
    scrollButtonVisibility();
  });
  
  //On click, animate the scrolling to the top, open the new tweet section, and focus the text area
  const toggleButton = $('#toggle-up');
  toggleButton.on('click', function(event) {
    event.preventDefault();
    scrollUp();
  });

  //--Navigation button functionality--//
  const navButton = $('.btn-tweet');
  navButton.on('click', function() {
   
    const input = $(this);
    showTweetArea(input);

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

const scrollButtonVisibility = function() {

  const navBar = $('.nav-container');
  const toggleButton = $('#toggle-up');

  //Show toggle button, and hide nav button when page is 100px scrolled vertically
  if ($(window).scrollTop() > 100) {
    toggleButton.addClass('show');
    navBar.addClass('hide-nav');
  } else {
    toggleButton.removeClass('show');
    navBar.removeClass('hide-nav');
  }

};

const scrollUp = function() {

  const newTweetContainer = $(this).closest('body').find('#new-tweet');
  const textObject = $(this).closest('body').find('#tweet-text');
  
  //animate scroll up, and focus on new tweet container when scrolled
  $('html, body').animate({scrollTop:0},200);
  newTweetContainer.slideDown();
  textObject.focus();

};

const showTweetArea = function(input) {

  const newTweetContainer = input.closest('body').find('#new-tweet');
  const textObject = input.closest('body').find('#tweet-text');
  const tweetsContainer = input.closest('body').find('#tweet-container');
  
   //if tweet container is not displayed, slide it down and focus text area, if it is displayed slide it up. add margin for styling purposes
  if (newTweetContainer.css('display') === 'none') {
    newTweetContainer.slideDown();
    tweetsContainer.removeClass('topMargin');
    textObject.focus();
    
  } else {
    newTweetContainer.slideUp();
    tweetsContainer.addClass('topMargin');
  }
};