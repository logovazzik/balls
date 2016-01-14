(function (angular) {
    var ngLoad = function () {
        return {
           
            link: function (scope, $element, attrs) {
                $element.on("load", function() {
                    scope.$eval(attrs.ngLoad);
                });
            }
        };
    };
    angular.module('app.directives').directive('ngLoad', [ngLoad]);
})(angular);