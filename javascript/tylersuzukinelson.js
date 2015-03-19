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

  $('#toggleSkillsMinimal').on('click', function() {
    $('#skillsTable td.danger').parent().toggle();
  });

  $('#toggleSkillsBasic').on('click', function() {
    $('#skillsTable td.warning').parent().toggle();
  });

  $('#toggleSkillsIntermediate').on('click', function() {
    $('#skillsTable td.info').parent().toggle();
  });

  $('#toggleSkillsProficient').on('click', function() {
    $('#skillsTable td.success').parent().toggle();
  });

  $('.glyphicon-envelope').on('click', function() {
    var z = "t";
    var y = "y";
    var x = "l";
    var w = "e";
    var v = "r";
    var u = ".";
    var t = "n";
    var s = "s";
    var r = "o";
    var q = "@";
    var p = "a";
    var o = "u";
    var n = "m";
    var m = "i";
    var l = "b";
    var k = "c";
    var _tmp_var_woo = z+y+x+w+v+u+t+w+x+s+r+t+q+p+x+o+n+t+m+u+o+l+k+u+k+p;
    window.prompt("Copy to clipboard: Ctrl/Cmd+C, Enter", _tmp_var_woo);
  });

});