$(document).ready(function() {

  $('.project').on('mouseenter', function() {
    $(this).find('.project-description').fadeIn();
  });

  $('.project').on('mouseleave', function() {
    $(this).find('.project-description').fadeOut();
  });

  $('.school').on('click', '.showClasses', function() {
    $(this).removeClass('showClasses').show();
    $(this).addClass('hideClasses').show();
    $(this).text('Hide Classes');
    $(this).siblings('.classes').show();
  });

  $('.school').on('click', '.hideClasses', function() {
    $(this).removeClass('hideClasses').show();
    $(this).addClass('showClasses').show();
    $(this).text('Show Classes');
    $(this).siblings('.classes').hide();
  });

});