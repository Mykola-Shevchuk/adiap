/* jslint browser:true*/
/* global jQuery*/
(function($) {
  'use strict';

  var prevAccount = fillAccount();
  var prevContact = fillContact();
  var prevCompany = fillCompany();
  var changeFlag = true;

  function fillAccount() {
    return {
      name: $('input[name="account[name]"]').val(),
      accountType: $('input[name="account[type]"]:checked').val(),
      clientType: $('#account_clientType option:selected').text(),
      address: $('input[name="account[address]"]').val(),
      city: $('input[name="account[city]"]').val(),
      state: $('#account_state option:selected').text(),
      zip: $('input[name="account[zip]"]').val(),
      notes: $('textarea[name="account[notes]"]').val()
    };
  }

  function fillCompany() {
    return {
      name: $('input[name="company[name]"]').val(),
      address: $('input[name="company[addressLine1]"]').val(),
      city: $('input[name="company[city]"]').val(),
      state: $('#company_state option:selected').text(),
      zip: $('input[name="company[zip]"]').val(),
      website: $('input[name="company[website]"]').val(),
      notes: $('textarea[name="company[notes]"]').val()
    };
  }

  function fillContact() {
    return {
      name: $('input[name="contact_person[firstName]"]').val(),
      lastName: $('input[name="contact_person[lastName]"]').val(),
      title: $('input[name="contact_person[title]"]').val(),
      email: $('input[name="contact_person[email]"]').val(),
      phone: trueNumber($('input[name="contact_person[phone]"]').val()),
      ext: $('input[name="contact_person[ext]"]').val(),
      cell: trueNumber($('input[name="contact_person[cell]"]').val()),
      fax: trueNumber($('input[name="contact_person[fax]"]').val()),
      cod: $('input[name="contact_person[cod]"]').is(':checked'),
      notes: $('textarea[name="contact_person[notes]"]').val(),
      mailAddress: $('input[name="contact_person[addresses][0][address]"]').val(),
      mailCity: $('input[name="contact_person[addresses][0][city]"]').val(),
      mailState: $('#contact_person_addresses_0_state option:selected').text(),
      mailZip: $('input[name="contact_person[addresses][0][zip]"]').val(),
      billAddress: $('input[name="contact_person[addresses][1][address]"]').val(),
      billCity: $('input[name="contact_person[addresses][1][city]"]').val(),
      billState: $('#contact_person_addresses_1_state option:selected').text(),
      billZip: $('input[name="contact_person[addresses][1][zip]"]').val()
    };
  }

  function compareObjects(obj1, obj2) {
    Object.keys(obj1).forEach(function(key) {
      if (obj1[key] !== obj2[key]) {
        changeFlag = false;
        return changeFlag;
      }
    });
  }

  function updateHandler(event, obj1, obj2) {
    compareObjects(obj1, obj2);
    if (changeFlag) {
      event.preventDefault();
      $('#updeteModal').modal('show');
    }
  }

  function trueNumber(str) {
    if (str) {
      return str.replace(/[()-/ /]/g, '');
    }
  }

  $('#account_update').click(function(event) {
    var resultAccount = fillAccount();
    updateHandler(event, prevAccount, resultAccount);
  });

  $('#contact_update').click(function(event) {
    var resultContact = fillContact();
    updateHandler(event, prevContact, resultContact);
  });

  $('#company_update').click(function(event) {
    var resultCompany = fillCompany();
    updateHandler(event, prevCompany, resultCompany);
  });
})(jQuery);

