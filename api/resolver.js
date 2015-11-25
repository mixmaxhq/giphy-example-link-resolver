var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var url = req.query.url.trim();

  // Giphy image urls are in the format:
  // http://giphy.com/gifs/<seo-text>-<alphanumeric id>
  var matches = url.match(/\-([a-zA-Z0-9]+)$/);
  if (!matches) {
    res.status(400).send('Invalid URL format');
    return;
  }

  var id = matches[1];

  var response;
  try {
    response = sync.await(request({
      url: 'http://api.giphy.com/v1/gifs/' + encodeURIComponent(id),
      qs: {
        api_key: key
      },
      gzip: true,
      json: true,
      timeout: 15 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  var image = response.body.data.images.original;
  var width = image.width > 600 ? 600 : image.width;
  var html = '<img style="max-width:100%;" src="' + image.url + '" width="' + width + '"/>';
  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
};