$(document).ready(function() {

  var image_path = 'assets/'

  if ( !navigator.userAgent.match('Chrome') ) {
    if ( !navigator.userAgent.match('Firefox') ) {
      $('.modal').modal('show');
    }
  }

  $('.trigger_button').hover(
    function() {
      $(this).prop('src', image_path + 'button_2.png')
    },
    function() {
      $(this).prop('src', image_path + 'button.png')
    }
  );
})
