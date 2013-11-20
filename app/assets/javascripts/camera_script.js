$(document).ready(function() {

  if ( $('.camera_page').length ) {

    var streaming = false,
        audio     = document.querySelector('audio'),
        video     = document.querySelector('video'),
        canvas    = document.querySelector('canvas'),
        photo    = document.querySelector('#photo'),
        width     = 200,
        height    = 150;

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
      canvas.height = 150;
      canvas.getContext('2d').drawImage(video, 0, 0, width, 150);
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }


    function playClickSound() {
      audio.play();
    };

    function colorizePhotos() {
      var effects = ['sepia', 'red', 'custom', 'grayscale', 'blue', 'green'];
      effects.sort(function() { return 0.5 - Math.random() });

      $.each(effects, function(key, color){
        $('#image_' + key + ' img').vintage({
          preset: color
        });
      });
    };

    function grabImage() {
      playClickSound();
      refreshImages();
      takepicture();
      $('.image')
                 .prop('src', $('#photo').prop('src'))
                 .addClass('snap_shot');
      colorizePhotos();
    };

    function refreshImages() {
      $('.photo p img').remove();
      for (var i = 0; i <= 5; i++) {
        $('<img class="image" src="" alt="Photo">').appendTo( $('#image_' + i) );
      }
    };

    $('.trigger_button').on('click', function(){
      grabImage();
    });

  }
})
