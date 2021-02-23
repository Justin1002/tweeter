$(document).ready(function() {
  $('#tweet-text').on('input',function() {
    $(this).parent().find('.counter').text(140-$(this).val().length)

    let length = Number($(this).parent().find('.counter').text())
    if (length < 0) {
      $('.counter').css("color","red")
    }
    else {
      $('.counter').css("color","inherit")
    }
  })
});