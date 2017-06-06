/* jslint browser:true*/
/* global jQuery*/
/* global window*/
(function($, window) {
  'use strict';

  function contactNotesHeight() {
    var contactDataHeight = $('#contactHeight1').innerHeight() + $('#contactHeight2').innerHeight();
    $('.app-contact-main__notes-text').innerHeight(contactDataHeight);
  }
  function setColumnHeight() {
    var trueHeight = $('.app-detailed__wrapper').innerHeight();
    $('.app-contact-list__container--tbody').innerHeight(trueHeight - 38);
  }

  function checkScroll() {
    var bodyHeight = $('.app-contact-list__container--tbody');
    if (bodyHeight.length !== 0) {
      var scrollContainer = $('.app-contact-list__container--scroll');
      if ((bodyHeight[0].scrollHeight > bodyHeight.innerHeight())) {
        scrollContainer.css('padding-right', '10px');
      } else {
        scrollContainer.css('padding-right', '0');
      }
    }
  }

  contactNotesHeight();
  setColumnHeight();
  checkScroll();

  $(window).resize(function() {
    contactNotesHeight();
    setColumnHeight();
    checkScroll();
  });

  $('.app-modal-link').click(function(e) {
    var path = $(e.target).attr('data-link');
    if (!path) {
      path = $(this).attr('data-link');
    }
    $('#modalYes').attr('href', path);
  });

  $('.app-contact-list__container--tbody').scroll(function() {
    var scroll = $(this).scrollLeft();
    $('.app-contact-list__container--theader').scrollLeft(scroll);
  });

  function unchecked(checkedInput, uncheckedInput) {
    if (!checkedInput.checked) {
      $(uncheckedInput).prop('checked', false);
    }
  }

  function checked(checkedInput, uncheckedInput) {
    if (checkedInput.checked) {
      $(uncheckedInput).prop('checked', true);
    }
  }

  $('#account_contact_person_authorizer').change(function() {
    unchecked(this, '#account_contact_person_authorizerBackflow');
    unchecked(this, '#account_contact_person_authorizerFire');
    unchecked(this, '#account_contact_person_authorizerPlumbing');
    unchecked(this, '#account_contact_person_authorizerAlarm');
  });

  $('#account_contact_person_access').change(function() {
    unchecked(this, '#account_contact_person_accessIsPrimary');
  });

  $('#account_contact_person_payments').change(function() {
    unchecked(this, '#account_contact_person_paymentsIsPrimary');
  });

  $('#account_contact_person_authorizerBackflow').change(function() {
    checked(this, '#account_contact_person_authorizer');
  });

  $('#account_contact_person_authorizerAlarm').change(function() {
    checked(this, '#account_contact_person_authorizer');
  });

  $('#account_contact_person_authorizerFire').change(function() {
    checked(this, '#account_contact_person_authorizer');
  });

  $('#account_contact_person_authorizerPlumbing').change(function() {
    checked(this, '#account_contact_person_authorizer');
  });

  $('#account_contact_person_accessIsPrimary').change(function() {
    checked(this, '#account_contact_person_access');
  });

  $('#account_contact_person_paymentsIsPrimary').change(function() {
    checked(this, '#account_contact_person_payments');
  });

  $('#refreshSelect').click(function() {
    $('#selectDeviceForm select').val('').selectpicker('refresh');
  });
})(jQuery, window);
