$(document).ready(function() {
  $('#tweet-text').on('input',function() {
    $(this).parent().find('.counter').text(140-$(this).val().length)

    let characters = $(this).parent().find('.counter').text()
    if (characters < 0) {
      $('.counter').css("color","red")
    }
    else {
      $('.counter').css("color","inherit")
    }
  })
});