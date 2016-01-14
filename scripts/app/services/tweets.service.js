(function (angular) {
    var TweetsService = function($http, helpers) {
        var url = "http://twitter.mynameisvova.ru/tweets?hashTag={hashTag}&count={count}&callback=JSON_CALLBACK";
        this.getTweets = function (hashTag, count, since) {
            var _url = helpers.applyTemplate(url, { hashTag: hashTag, count: count });
            if (since) {
                _url += "&since=" + since;
            }
            return $http.jsonp(_url);
        };
    };
    angular.module('app.services').service('TweetsService', ['$http', 'Helpers', TweetsService]);
})(angular)