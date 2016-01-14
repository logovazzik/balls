(function(angular) {
    angular.module('app.directives', []);
    angular.module('app.services', []);
    angular.module('app.controllers', []);
    angular.module('app.factories', []);

    angular.module('app.tweets', ['app.directives', 'app.services', 'app.controllers', 'app.factories']);
})(angular)