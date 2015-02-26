var skills = [
  ['ActiveRecord',1,['2015']],
  ['AJAX',1,['2015']],
  ['Bootstrap',1,['2015']],
  ['C',0,['2013']],
  ['C++',0,['2009-2011']],
  ['CSS3',1,['2004-2015']],
  ['Devise',1,['2015']],
  ['Eclipse',1,['2009-2011']],
  ['HTML5',1,['2002-2015']],
  ['Integrated Circuits',1,['2009','2014']],
  ['Java',1,['2009-2011']],
  ['Javascript',1,['2015']],
  ['jQuery',1,['2015']],
  ['Perl',1,['2010-2014']],
  ['PHP',0,['2004-2014']],
  ['phpBB',0,['2007-2010']],
  ['PostgreSQL',1,['2015']],
  ['Python',1,['2013-2014']],
  ['MySQL',1,['2004-2014']],
  ['Notepad++',1,['2010-2014']],
  ['Rails',2,['2015']],
  ['Ruby',1,['2015']],
  ['Sublime',1,['2015']],
  ['Wordpress',1,['2005-2014']],
  ['Vim',1,['2013-2014']]
];

var colors = {
  '0': 'danger',
  '1': 'warning',
  '2': 'info',
  '3': 'success'
};

var current_year = 2015;
var total_years = current_year - 2002 + 1;
var cw = 100 / (total_years + 1);
var flagFound = false;

var graph = "<table class=\"table table-condensed\">";

// Generate the legend
graph += "<thead><tr><th style=\"width: " + cw + "%\"></th>";
for (var year = 2002; year <= current_year; year++) {
  graph += "<th style=\"width: " + cw + "%\">" + year + "</th>";
}
graph += "</tr></thead><tbody>";

// Generate the graph
for (var competence = 3; competence >= 0; competence--) {
  for (var skill = 0; skill < skills.length; skill++) {
    if (skills[skill][1] == competence) {
      graph += "<tr><td style=\"width: " + cw + "\"><strong>" + skills[skill][0] + "</strong></td>";
      for (var year = 2002; year <= current_year; year++) {
        flagFound = false;
        for (var years = 0; years < skills[skill][2].length; years++) {
          var tmp_years = skills[skill][2][years].split('-');
          if (tmp_years.length == 1) {
            if (tmp_years[0] == year) {
              flagFound = true;
              break;
            }
          } else {
            if ((tmp_years[0] <= year) && (year <= tmp_years[1])) {
              flagFound = true;
              break;
            }
          }
        }
        if (flagFound) {
          graph += "<td class=\"" + colors[competence] + "\" style=\"width: " + cw + "\"></td>";
        } else {
          graph += "<td style=\"width: " + cw + "\"></td>";
        }
      }
      graph += "</tr>";
    }
  }
}

graph += "</tbody></table>"