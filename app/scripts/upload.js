/* jslint browser:true*/
/* global jQuery*/
/* global FileReader*/

(function($) {
  'use strict';

  function filePreview(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('#imgPlace').removeClass('app-device-form__img-place');
        $('#imgTrigger').hide();
        $('#imgDelete').show();
        $('#imgPlace').append('<img src="' + e.target.result + '" id="imgContent" class="app-device-form__img-content"/>');
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $('#imgUpload').change(function() {
    var ext = $('#imgUpload').val().split('.').pop().toLowerCase();
    var error = $('#uploadError');
    if (this.files[0].size > 10000000) {
      $(this).val('');
      error.addClass('app-submit-error app-device-form__img-error').text('The file is too large. Allowed maximum size is 10M');
    } else if ($.inArray(ext, ['png', 'jpg', 'jpeg']) === -1) {
      $(this).val('');
      error.addClass('app-submit-error app-device-form__img-error').text('The image has to be in format "jpg", "jpeg" or "png". Please select anouther image');
    } else {
      filePreview(this);
      error.removeClass('app-submit-error app-device-form__img-error').text('');
    }
  });

  $('#imgDelete').click(function() {
    var modal = $('#deleteImage');
    modal.modal('show');
    modal.on('shown.bs.modal', function() {
      $('input').blur();
      $('button[data-submit="Yes"]').click(function() {
        $('#imgContent').remove();
        $('#imgPlace').addClass('app-device-form__img-place');
        $('#imgDelete').hide();
        $('#imgTrigger').show();
      });
    });
  });

  $('#imgTrigger').click(function() {
    $('input[type="file"]').trigger('click');
  });
})(jQuery);
