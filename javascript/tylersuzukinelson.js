$(document).ready(function() {
  $('.project').on('mouseenter', function() {
    $(this).find('.project-description').fadeIn();
  });
  $('.project').on('mouseleave', function() {
    $(this).find('.project-description').fadeOut();
  });
});