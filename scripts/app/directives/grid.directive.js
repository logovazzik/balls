(function (angular) {
    var ngMasonry = function ($rootScope) {
        return {
            scope: {
                settings: "=ngMasonry"
            },
            link: function (scope, $element, attrs) {
                $element.masonry(scope.settings);
                scope.$on("grid.reflow", function() {
                    if ($rootScope.grideReflowTimer) clearTimeout($rootScope.grideReflowTimer);
                    $rootScope.grideReflowTimer = setTimeout(function() {
                        if($element.masonry){
							$element.one('layoutComplete', function(){
								$element.addClass(scope.settings.layoutCompleteClass);
								console.log("completed")
							}).masonry('reloadItems').masonry('layout');
						}
                    }, 300);

                });
            }
        };
    };

    angular.module('app.directives').directive('ngMasonry', ['$rootScope', ngMasonry]);
})(angular);