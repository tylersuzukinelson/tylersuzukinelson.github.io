$(document).ready(function() {

  $('.project').on('mouseenter', function() {
    $(this).find('.project-description').fadeIn();
  });

  $('.project').on('mouseleave', function() {
    $(this).find('.project-description').fadeOut();
  });

  $('.school').on('click', '.showTopics', function() {
    $(this).removeClass('showTopics').show();
    $(this).addClass('hideTopics').show();
    $(this).text('Hide Topics Covered');
    $(this).siblings('.topics').show();
  });

  $('.school').on('click', '.hideTopics', function() {
    $(this).removeClass('hideTopics').show();
    $(this).addClass('showTopics').show();
    $(this).text('Show Topics Covered');
    $(this).siblings('.topics').hide();
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

  $('.school').on('click', '.showAwards', function() {
    $(this).removeClass('showAwards').show();
    $(this).addClass('hideAwards').show();
    $(this).text('Hide Awards');
    $(this).siblings('.awards').show();
  });

  $('.school').on('click', '.hideAwards', function() {
    $(this).removeClass('hideAwards').show();
    $(this).addClass('showAwards').show();
    $(this).text('Show Awards');
    $(this).siblings('.awards').hide();
  });

});