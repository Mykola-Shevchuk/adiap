/* jslint browser:true*/
/* global jQuery*/
/* global location*/
(function($) {
  'use strict';

  var validationForm = {
    focusCleanup: true,
    focusInvalid: false
  };

  function ruleRequired(lengthMax, lengthMin) {
    var rule = {
      required: true,
      notOnlySpace: true
    };
    if (lengthMax) {
      rule.maxlength = lengthMax;
    }
    if (lengthMin) {
      rule.minlength = lengthMin;
    }
    return rule;
  }

  function ruleMaxLength(length) {
    return {
      maxlength: length
    };
  }

  function ruleEmail(required) {
    var rule = {
      email: true,
      trueEmail: true,
      maxlength: 50
    };
    if (required) {
      rule.required = true;
      rule.notOnlySpace = true;
    }
    return rule;
  }

  function highlightSelect(element, errorClass) {
    $(element).addClass(errorClass);
    if ($(element).hasClass('selectpicker')) {
      $(element).closest('.form-group').addClass('has-error');
    }
  }

  function unhighlightSelect(element, errorClass) {
    $(element).removeClass(errorClass);
    if ($(element).hasClass('selectpicker')) {
      $(element).closest('.form-group').removeClass('has-error');
    }
  }

  function sendForm(form) {
    $('.app-submit-error').removeClass('app-submit-error').html('');
    $(form).find('button[type="submit"]').attr('disabled', 'disabled');
    form.submit();
    // setTimeout(function() {
    //   $(form).find('button[type="submit"]').attr('disabled', false);
    // }, 5000);
  }

  function showModal(form, selector) {
    $(selector).modal('show');
    $(selector).on('shown.bs.modal', function() {
      $('input').blur();
      $('button[data-submit="Yes"]').click(function() {
        sendForm(form);
      });
    });
  }

  function onSubmitHandler(form, selector, entity) {
    if ($('button[type="submit"]').attr('data-update') === 'Yes') {
      $('.modal-body p').text('Are you sure you want to update this ' + entity + '?');
    }
    showModal(form, selector);
  }

  function onLinkHandler(form, selector, entity, linkTo) {
    $('.modal-body p').text('Are you sure you want to create new ' + entity + ' and link it to the ' + linkTo + '?');
    showModal(form, selector);
  }

  $('.selectpicker').on('change', function() {
    $(this).valid();
  });

  $('#loginForm').validate($.extend({}, {
    rules: {
      _username: ruleEmail(true),
      _password: ruleRequired(undefined, 6)
    },
    submitHandler: function(form) {
      sendForm(form);
    }
  }, validationForm));

  $('#accountForm').validate($.extend({}, {
    rules: {
      'account[name]': ruleRequired(100),
      'account[address]': ruleRequired(100),
      'account[city]': ruleRequired(50),
      'account[zip]': ruleRequired(50),
      'account[notes]': ruleMaxLength(255),
      'account[state]': {required: true}
    },
    highlight: function(element, errorClass) {
      highlightSelect(element, errorClass);
    },
    unhighlight: function(element, errorClass) {
      unhighlightSelect(element, errorClass);
    },
    submitHandler: function(form) {
      var linkTo = $('button[type="submit"]').attr('data-link');
      if (linkTo) {
        onLinkHandler(form, '#accountModal', 'Site Account', linkTo);
      } else {
        onSubmitHandler(form, '#accountModal', 'Account');
      }
    }
  }, validationForm));

  $('#companyForm').validate($.extend({}, {
    rules: {
      'company[name]': ruleRequired(100),
      'company[addressLine1]': ruleMaxLength(100),
      'company[city]': ruleMaxLength(50),
      'company[zip]': ruleMaxLength(50),
      'company[website]': ruleMaxLength(100),
      'company[notes]': ruleMaxLength(255)
    },
    submitHandler: function(form) {
      var linkTo = $('button[type="submit"]').attr('data-link');
      if (linkTo) {
        onLinkHandler(form, '#companyModal', 'Company', linkTo);
      } else {
        onSubmitHandler(form, '#companyModal', 'Company');
      }
    }
  }, validationForm));

  $('#searchForm').validate($.extend({}, {
    rules: {
      searchPhrase: ruleRequired(100)
    },
    messages: {
      searchPhrase: {
        required: 'Please enter your search request.'
      }
    }
  }, validationForm));

  $('#contactForm').validate($.extend({}, {
    rules: {
      'contact_person[firstName]': ruleRequired(100),
      'contact_person[lastName]': ruleMaxLength(100),
      'contact_person[title]': ruleMaxLength(100),
      'contact_person[email]': ruleEmail(),
      'contact_person[ext]': ruleMaxLength(10),
      'contact_person[notes]': ruleMaxLength(255),
      'contact_person[addresses][0][address]': ruleMaxLength(100),
      'contact_person[addresses][0][city]': ruleMaxLength(50),
      'contact_person[addresses][0][zip]': ruleMaxLength(50),
      'contact_person[addresses][1][address]': ruleMaxLength(100),
      'contact_person[addresses][1][city]': ruleMaxLength(50),
      'contact_person[addresses][1][zip]': ruleMaxLength(50)
    },
    submitHandler: function(form) {
      onSubmitHandler(form, '#contactModal', 'Contact');
    }
  }, validationForm));

  $('#roleForm').validate($.extend({}, {
    submitHandler: function(form) {
      if ($('input[type="checkbox"]:checked').length === 0) {
        $('#warningRoleModal').modal('show');
      } else {
        onSubmitHandler(form, '#roleModal');
      }
    }
  }, validationForm));

  $('#selectDeviceForm').validate($.extend({}, {
    rules: {
      device: {required: true}
    },
    highlight: function(element, errorClass) {
      highlightSelect(element, errorClass);
    },
    unhighlight: function(element, errorClass) {
      unhighlightSelect(element, errorClass);
    },
    submitHandler: function() {
      var linkTo = $('select option:selected').attr('data-link');
      $(location).attr('href', linkTo);
    }
  }, validationForm));

  $('#deviceForm').validate($.extend({}, {
    submitHandler: function(form) {
      showModal(form, '#deviceModal');
    }
  }, validationForm));

  $('.app-validation-digits').each(function() {
    $(this).rules('add', {
      digits: true,
      messages: {
        digits: 'Digits only.'
      }
    });
  });

  $('.app-validation-phone').each(function() {
    $(this).rules('add', {
      correctNumber: true
    });
  });

  jQuery.validator.addMethod('trueEmail', function(value, element) {
    return this.optional(element) || (/^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/
      .test(value)
    );
  }, 'Please enter a valid email address.');

  jQuery.validator.addMethod('notOnlySpace', function(value) {
    return (!(/^\s*$/.test(value)) || value.length === 0);
  }, 'String contains only spaces');

  jQuery.validator.addMethod('correctNumber', function(value) {
    return (value.indexOf('_') === -1) || !(/\d/.test(value));
  }, 'Please enter a full number.');

  $('.app-validation-phone').mask('(999) 999-9999', {autoclear: false});
})(jQuery);
