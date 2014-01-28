angular.module('RailsPanel', [])
  .directive('ngHtml', function() {
    return function(scope, element, attrs) {
      scope.$watch(attrs.ngHtml, function(value) {
        element[0].innerHTML = value;
      });
    }
  }).
  filter('editorify', function() {
    return function(filename, line) {
      var mapping = {
        mvim: "mvim://open?url=file://%s&line=%d&column=%d",
        mate: "txmt://open?url=file://%s&line=%d&column=%d",
        subl: "subl://open?url=file://%s&line=%d&column=%d",
        sblm: "sblm:///%s",
        emacs: "emacs://open?url=file://%s&line=%d&column=%d",
        mine: "rubymine://open?url=file://%s&line=%d"}
      var editor = localStorage.getItem("railspanel.editor");
      var work_find_what = localStorage.getItem("railspanel.work_find_what");
      var work_replace_with = localStorage.getItem("railspanel.work_replace_with");
      filename = filename.replace(work_find_what,work_replace_with);
      var editorPrefix = mapping[editor]
      if (editor === 'sblm') {
        var out = sprintf(editorPrefix, filename);
        // remove sblm:///c:/git/Icome/app/views/homes/index.html.erb the second :
        // so become sblm:///c/git/Icome/app/views/homes/index.html.erb
        out = out.slice(0, 9) + out.slice(10, out.len);
      } else {
        var out = sprintf(editorPrefix, filename, line, 1);
      }
      return out;
    }
  }).
  filter('normalizeViewPath', function() {
    return function(input) {
      return input.remove(/.*\/app\/views/);
    }
  }).
  filter('sanitize', function() {
    return function(input) {
      return input.
        replace(/&/g, '&amp;').
        replace(/</g, '&lt;').
        replace(/>/g, '&gt;');
    }
  }).
  filter('ansi2html', function() {
    return function(input) {
      return ansi2html(input);
    }
});
