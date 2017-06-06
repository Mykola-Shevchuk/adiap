/* jslint browser:true*/
/* global jQuery*/
/* global window*/
(function($) {
  'use strict';

  function removeActivePagination(target, className) {
    $('.app-active-page').removeClass('app-active-page');
    $('.app-active-arrow').removeClass('app-active-arrow');
    $(target).addClass(className);
  }

  function toggle(target, className1, className2) {
    $(target).toggleClass(className1);
    $(target).toggleClass(className2);
  }

  function setTab(activeNumber) {
    $('input[name="tab"]').val(activeNumber);
  }

  $('a').tooltip({container: 'nav'});

  // $('.app-nav__icon').click(function(e) {
  //   $('.app-nav__container--active').removeClass('app-nav__container--active');
  //   e.target.parents('.app-nav__container').addClass('app-nav__container--active');
  //   e.target.find('path').attr('class', 'app-nav__icon-img--grey');
  //   $('[data-toggle="tooltip"]').tooltip('hide');
  // });

  $('.app-nav__icon').hover(function() {
    $('[data-toggle="tooltip"]').not(this).tooltip('hide');
  });

  $('.app-data__table-data--arrow-top').click(function(e) {
    toggle(e.target, 'app-data__table-data--arrow-top', 'app-data__table-data--arrow-bottom');
  });

  $('.app-data__table-data--arrow-bottom').click(function(e) {
    toggle(e.target, 'app-data__table-data--arrow-bottom', 'app-data__table-data--arrow-top');
  });

  $('.pagination a').not('.app-pagination-arrow').click(function(e) {
    removeActivePagination(e.target, 'app-active-page');
  });

  $('.app-pagination-arrow').click(function(e) {
    removeActivePagination(e.target, 'app-active-arrow');
  });

  $('.app-search-panel__icon-settings').click(function() {
    var toggleBlock = $('#app-toggle-block');
    $(this).toggleClass('app-search-panel__icon-settings--active');
    toggleBlock.toggleClass('app-toggle-block--inactive');
    var advancedStatus = toggleBlock.hasClass('app-toggle-block--inactive') ? 0 : 1;
    $('input[name="advanced"]').val(advancedStatus);
  });

  $('.selectpicker').selectpicker({
    size: 4,
    dropupAuto: false
  });

  $('#tab1').click(function() {
    setTab(1);
  });

  $('#tab2').click(function() {
    setTab(2);
  });

  $('#tab3').click(function() {
    setTab(3);
  });

  $('.app-capitalize').on('keyup', function(e) {
    var code = (e.keyCode || e.which);
    if (code === 37 || code === 38 || code === 39 || code === 40 || code === 46 || code === 8) {
      return;
    }
    var start = this.selectionStart;
    var end = this.selectionEnd;
    $(this).val($(this).val().substr(0, 1).toUpperCase() + $(this).val().substr(1));
    this.setSelectionRange(start, end);
  });

  $(window).bind('pageshow', function(event) {
    if (event.originalEvent.persisted) {
      window.location.reload();
    }
  });
})(jQuery);
