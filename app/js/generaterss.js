/*
    Example feed welcome page
    http://news.bbc.co.uk/2/hi/help/rss/default.stm
    example feed (view in chrome)
    http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk
 */

var RSS = require('rss');
var fs = require('fs');

module.exports = function GenerateRss(rss_output)
{
    /* lets create an rss feed */
    var feed = new RSS({
        title: 'Kulinarian Blog: Food, Recipes, and Tech',
        description: 'description',
        feed_url: 'http://example.com/rss.xml',
        site_url: 'http://example.com'
    });
     
    /* loop over data and add to feed */
    feed.item({
        title:  'item title',
        description: 'use this for the content. It can include html.',
        url: 'http://example.com/article4?this&that', // link to the item 
    });

    // cache the xml to send to clients 
    var xml = feed.xml();

    fs.writeFileSync(rss_output, xml, "utf8");
};
