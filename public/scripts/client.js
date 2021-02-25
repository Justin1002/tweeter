
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const tweetButton = $('.tweet-button');
  
  tweetButton.on('click', function(event) {
    event.preventDefault();
    const input = $(this);
    tweetButtonOutput(input);

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

//escape function for HTML text
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Timestamp function to create accurate tweet timestamps
const timeStamp = function(timeDiff) {

  let dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));
  let hourDiff = Math.round(timeDiff / (1000 * 3600));
  let minuteDiff = Math.round(timeDiff / (60000));
  let secondDiff = Math.round((timeDiff / (1000)));

  if (timeDiff >= 86400000) {
    if (dayDiff === 1) {
      return `<span>${dayDiff} day ago</span>`;
    }
    return `<span>${dayDiff} days ago</span>`;
  }
  if (timeDiff >= 3600000) {
    if (hourDiff === 1) {
      return `<span>${hourDiff} hour ago</span>`;
    }
    return `<span>${hourDiff} hours ago</span>`;
  }
  if (timeDiff >= 60000) {
    if (minuteDiff === 1) {
      return `<span>${minuteDiff} minute ago</span>`;
    }
    return `<span>${minuteDiff} minutes ago</span>`;
  }
  if (timeDiff >= 1000) {
    if (secondDiff === 1) {
      return `<span>${secondDiff} second ago</span>`;
    }
    return `<span>${secondDiff} seconds ago</span>`;
  }
  if (timeDiff < 1000) {
    return `<span>Just moments ago</span>`;
  }
};

//Create tweet element function
const createTweetElement = function(object) {

  let dateCreated = new Date(object.created_at);
  let today = new Date();
  let timeDiff = Math.ceil(Math.abs(today.getTime() - dateCreated.getTime()));

  const $tweet = `
  <article> 
    <header class ="tweet-header">
      <img src = "${object.user.avatars}"></img>
      <p>${object.user.name}</p>
      <span class="handle">${object.user.handle}</span>
      </header>
    <p class="tweet">
    ${escape(object.content.text)}
    </p>
    <footer class="tweet-footer">
     ${timeStamp(timeDiff)}
      <div>
        <span class='social-icons'>
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </span>
      </div>
    </footer>
  </article>`;

  return $tweet;
};


//renders all tweets in an array
const renderTweets = function(arr) {
  //empty tweet container prior to filling it with new tweets
  $('#tweet-container').empty();
  for (const tweet of arr) {
    let tweetItem = createTweetElement(tweet);
    $('#tweet-container').prepend(tweetItem);
  }
};

//Loads tweet from database file
const loadTweets = () => {
  $.getJSON('/tweets/', function(data) {
    renderTweets(data);
  });
};

//Inital loading call when page is loaded
loadTweets();

const tweetButtonOutput = function(input) {

  //declare textarea variables
  const textObject = input.closest('form').find('#tweet-text');
  const serializedText = textObject.serialize();
  const textValue = textObject.val();

  //declare error variables
  const error = input.closest('section').find('.error');
  const errorIcon = `<i class="fas fa-exclamation-triangle"></i>`;

  //declare counter variables
  let counter = input.closest('form').find('.counter');
  
  //clear error message and slide error up (only if error was present)
  error.html("");
  error.slideUp();

  //timeout to ensure error message fully clears and slides up before inserting new error message or successful post
  setTimeout(function() {

    if (textValue === "" || textValue === null) {
      error.append(`${errorIcon} Error Message: Tweet cannot be empty ${errorIcon}`);
      error.slideDown();
      textObject.focus();

    } else if (textValue.length > 140) {
      error.append(`${errorIcon} Error Message: Tweet exceeds 140 characters ${errorIcon}`);
      error.slideDown();
      textObject.focus();

    } else {
      $.post("/tweets/",serializedText, function() {
        //successful post, slide up any existing error message, remove previous text input and reset counter to 140.
        //reload tweet
        error.slideUp();
        textObject.val('');
        counter.text(140);
        loadTweets();
      });
    }

  }, 300);

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