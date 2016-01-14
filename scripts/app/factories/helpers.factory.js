(function () {

    function applyTemplate(template, replacements) {
        return template.replace(/{(\w+)}/g, function (e, n) {
     
            return void 0 !== replacements[n] ? encodeURIComponent(replacements[n]) : "";
        });
    }

    var Helpers = function () {
        return {
            applyTemplate: applyTemplate
        };
    };


    angular.module('app.factories').factory('Helpers', [Helpers]);
})();