function OptionsCtrl($scope) {
  $scope.editor = localStorage.getItem("railspanel.editor");

  $scope.$watch('editor', function(value) {
    localStorage.setItem("railspanel.editor", value);
	});

  $scope.work_find_what = localStorage.getItem("railspanel.work_find_what");

  $scope.$watch('work_find_what', function(value) {
    localStorage.setItem("railspanel.work_find_what", value);
	});

  $scope.work_replace_with = localStorage.getItem("railspanel.work_replace_with");

  $scope.$watch('work_replace_with', function(value) {
    localStorage.setItem("railspanel.work_replace_with", value);
	});

	$scope.is_win32 = (navigator.platform == 'Win32');
}

