
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready( function() {

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str))
  return div.innerHTML;
}

const createTweetElement = function(object) {

  let dateCreated = new Date(object.created_at)
  let today = new Date();

  let timeDiff = Math.abs(today.getTime() - dateCreated.getTime())
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

  const $tweet = `
  <article> 
    <header class ="tweet-header">
      <img src = "${object.user.avatars}"></img>
      <p>${object.user.name}</p>
      <span class="handle">${object.user.handle}</span>
      </header>
    <div class="tweet">
    ${escape(object.content.text)}
    </div>
    <footer class="tweet-footer">
      ${diffDays === 1 ? `<span>${diffDays} day ago</span>` : `<span>${diffDays} days ago</span>`}
      <div>
        <span class='social-icons'>
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </span>
      </div>
    </footer>
  </article>`

  return $tweet
}

const renderTweets = function(arr) {
  for (const tweet of arr) {
    let tweetItem = createTweetElement(tweet)
    $('#tweet-container').prepend(tweetItem) 
  }
}

const loadTweets = () => {
  $.getJSON('/tweets/', function(data) {
    renderTweets(data)
  })
}

loadTweets()

const button = $('.tweet-button');
  
button.on('click', function(event) {

    event.preventDefault()

    let textObject = $(this).closest('form').find('#tweet-text')
    let serializedText = textObject.serialize()
    let text = textObject.val()

    let error = $(this).closest('section').find('.error')
    let errorMsg =$(this).closest('section').find('.msg')
    let counter = $(this).closest('form').find('.counter')
    
    errorMsg.html("");
    error.slideUp();

    setTimeout(function() {
      if (text === "" || text === null) {
        errorMsg.append(`Error Message: Tweet cannot be empty`)
        error.slideDown()
        textObject.focus()
      }
  
      else if (text.length > 140) {
        errorMsg.append(` Error Message: Tweet exceeds 140 characters`)
        error.slideDown()
        textObject.focus()
      }
      else {
        $.post("/tweets/",serializedText, function() {
          error.slideUp()
          textObject.val('');
          counter.text(140)
          loadTweets()
        })
      }

    }, 300)
  
  })

})