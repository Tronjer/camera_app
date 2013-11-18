$(document).ready(function() {

  if ( $('.camera_page').length ) {

    var streaming = false,
        audio     = document.querySelector('audio'),
        video     = document.querySelector('video'),
        canvas    = document.querySelector('canvas'),
        photo    = document.querySelector('#photo'),
        width     = 200,
        height    = 150,
        image_path = 'assets/',
        button = $('.trigger_button');

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia
                         );

    navigator.getMedia(
      {
        video: true,
        audio: false
      },

      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },

      function(err) {
        alert("An error occured! " + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    function takepicture() {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }


    function playClickSound() {
      audio.play();
    };

    function colorizePhotos() {
      var effects = ['sepia', 'red', 'custom', 'grayscale', 'blue', 'green'];

      $.each(effects, function(key, color){
        $('#image_' + key).vintage({
          preset: color
        });
      });
    };

    function grabImage() {
      playClickSound();

      if ( navigator.userAgent.match('Chrome') ) {
        takepicture();
        $('.image')
                   .prop('src', $('#photo').prop('src'))
                   .addClass('snap_shot');
        colorizePhotos();
      };
    };

    if ( !navigator.userAgent.match('Chrome') ) {
      $('.modal').modal('show')
    }

    $(button).hover(
      function() {
        $(this).prop('src', image_path + 'button_2.png')
      },
      function() {
        $(this).prop('src', image_path + 'button.png')
      }
    );

    $(button).on('click', function(){
      grabImage();
    });

  }
})
