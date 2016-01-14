(function (angular) {
    var ngRepeatDone = function() {
        return {
            link: function(scope, element, attrs) {
                if (scope.$last) {
                    scope.$eval(attrs.ngRepeatDone);
                }
            }
        };
    };
    angular.module('app.directives').directive('ngRepeatDone', [ngRepeatDone]);
})(angular);