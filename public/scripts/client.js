
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready( function() {

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
    ${object.content.text}
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
    setTimeout(loadTweets(), 2000);
  })
}

loadTweets()

const $button = $('.tweet-button');
  
$button.on('click', function(event) {

    event.preventDefault()
    let textData = $(this).closest('form').find('#tweet-text')
    let serializedText = textData.serialize()
    if (textData.val() === "" || textData.val() === null) {
      alert("Tweet cannot be empty!")
    }

    else if (textData.val().length > 140) {
      alert("Tweet is more than 140 characters.")
    }
    else {
      $.post("/tweets/",serializedText, function() {
        textData.val('');
      })
    }

  })

})