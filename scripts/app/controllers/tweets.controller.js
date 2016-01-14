(function (angular) {
    var TweetsController = function (tweetsService, $rootScope, helpers, $sce) {
        this.tweets = [];

        var self = this;
        this.sce = $sce;
        this.reflow = function(image) {
    
            $rootScope.$broadcast('grid.reflow');
        };
        this.gridOptions = {
            itemSelector: '.b-tweet-cell',
            gutter: 0,
			layoutCompleteClass: 'b-tweets-grid_completed'
        };
      
        var replacements = {
            hashTag: {
                template: "<a href=\"https://twitter.com/hashtag/{hashTag}?src=hash\"  class=\"b-hashtag-link\  target=\"_blank\">{hashTag}</a>",
                rgx: /(?:\s|^|\W)(@(\w+))(?:\W|\s|$)/gi
            },
            reply: {
                template: "<a href=\"https://twitter.com/{reply}\" class=\"b-reply-link\" target=\"_blank\">{reply}</a>",
                rgx: /(?:\s|^|\W)(#(\w+))(?:\W|\s|$)/gi
            }
        };
        this.compileContent = function(content) {
            content = content.replace(/https:\/\/t\.co\S*(\s|$)/gi, ' ');

            jQuery.each(replacements, function (k, v) {
                var rgx = v.rgx, res;
                while ((res = rgx.exec(content)) != null) {
                    var obj = {};
                    obj[k] = res[2];
                    content = helpers.applyTemplate(content.replace(res[1], v.template), obj);
                }
                
            });
            return content;

        };

        this.getTweets = function (hashTag, count, since) {

            tweetsService.getTweets(hashTag, count, since).success(function(data) {
                var metadata = data.search_metadata, delta;
                if (!metadata.count) return;
                angular.forEach(data.statuses, function (v) {
                    
                    v.text = self.compileContent(v.text);
                });
                self.tweets = self.tweets.concat(data.statuses);
                if ((delta = count - metadata.count) > 0) {
                    self.getTweets(hashTag, delta, metadata.max_id);
                }


            });
        };
       
    };
    angular.module('app.controllers').controller('TweetsController', ['TweetsService', '$rootScope', 'Helpers', '$sce', TweetsController]);
})(angular)