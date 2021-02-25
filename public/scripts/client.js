
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const tweetButton = $('.tweet-button');
  
  tweetButton.on('click', function(event) {

    event.preventDefault();
    //declare textarea variables
    const textObject = $(this).closest('form').find('#tweet-text');
    const serializedText = textObject.serialize();
    const textValue = textObject.val();
    //declare error variables
    const error = $(this).closest('section').find('.error');
    const errorIcon = `<i class="fas fa-exclamation-triangle"></i>`;
    //declare counter variables
    let counter = $(this).closest('form').find('.counter');
    
    error.html("");
    error.slideUp();

    //timeout to ensure error message fully clears and slides up before inserting new error message or success post
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
          error.slideUp();
          textObject.val('');
          counter.text(140);
          loadTweets();
        });
      }

    }, 300);
  
  });

});

//escape function for HTML text
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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

const renderTweets = function(arr) {
  for (const tweet of arr) {
    let tweetItem = createTweetElement(tweet);
    $('#tweet-container').prepend(tweetItem);
  }
};

const loadTweets = () => {
  $.getJSON('/tweets/', function(data) {
    renderTweets(data);
  });
};

loadTweets();


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