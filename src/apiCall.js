var querystring = require('querystring');
var xhr = require('xhr');

if (!xhr.open) xhr = require('request');

const ytAPI = function(resourceType, requestType, opts, cb) {
    xhr({
            url: 'https://content.googleapis.com/youtube/v3/' + resourceType + '?' + querystring.stringify(opts),
            method: requestType
        },
        function(err, res, body) {
            if (err) return cb(err);

            try {
                var result = JSON.parse(body);

                if (result.error) {
                    var error = new Error(result.error.errors.shift().message);
                    return cb(error);
                }

                var pageInfo = {
                    totalResults: result.pageInfo.totalResults,
                    resultsPerPage: result.pageInfo.resultsPerPage,
                    nextPageToken: result.nextPageToken,
                    prevPageToken: result.prevPageToken
                };

                var contentDeatails = result.items.map(function(item) {
                    return item.contentDetails;
                });

                var findings = result.items.map(function(item) {
                    var link = '';
                    var id = '';
                    switch (item.id.kind) {
                        case 'youtube#channel':
                            link = 'https://www.youtube.com/channel/' + item.id.channelId;
                            id = item.id.channelId;
                            break;
                        case 'youtube#playlist':
                            link = 'https://www.youtube.com/playlist?list=' + item.id.playlistId;
                            id = item.id.playlistId;
                            break;
                        default:
                            link = 'https://www.youtube.com/watch?v=' + item.id.videoId;
                            id = item.id.videoId;
                            break;
                    }

                    return {
                        id: id,
                        link: link,
                        kind: item.id.kind,
                        publishedAt: item.snippet.publishedAt,
                        channelId: item.snippet.channelId,
                        channelTitle: item.snippet.channelTitle,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnails: item.snippet.thumbnails
                    };
                });

                return cb(null, findings, pageInfo, contentDeatails);
            } catch (e) {
                return cb(e);
            }
        }
    );
};

const notify = videos => {
    let videosJSON = JSON.stringify(videos);

    xhr({
            body: videosJSON,
            method: 'POST',
            url: 'https://adonis-app-garjleuroa.now.sh/push',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        function(err, resp, body) {
            if (err) console.log(err);
        }
    );
};

module.exports = {
    ytAPI: ytAPI,
    notify: notify
};