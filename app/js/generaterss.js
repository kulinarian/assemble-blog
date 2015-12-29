/*
    Example feed welcome page
    http://news.bbc.co.uk/2/hi/help/rss/default.stm
    example feed (view in chrome)
    http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk
 */

var fs = require('fs');
var fm = require('front-matter');
var path = require('path');
var RSS = require('rss');
var walk = require('fs-walk');

module.exports = function GenerateRss(rss_source, rss_file)
{
    rss_source = normalizeDir(rss_source);

    /* lets create an rss feed */
    var feed = new RSS({
        title: 'Kulinarian Blog: Food, Recipes, and Tech',
        description: 'description',
        feed_url: 'http://example.com/rss.xml',
        site_url: 'http://example.com'
    });

    files = getSourceFiles(rss_source);    
     
    /* loop over data and add to feed */
    feed.item({
        title:  'item title',
        description: 'use this for the content. It can include html.',
        url: 'http://example.com/article4?this&that', // link to the item 
    });

    // cache the xml to send to clients 
    var xml = feed.xml();
    fs.writeFileSync(rss_file, xml, "utf8");
};

function getSourceFiles(rss_source)
{
    var files = [];

    walk.walkSync(rss_source, function(basedir, filename, stat) {
        // create path to file
        var filename = normalizeDir(basedir) + filename;
        // create file object
        var file = fs.lstatSync(filename);        
        // if it's a directory, do nothing
        if (file.isDirectory()) return;
        var extension = path.extname(filename);
        if (extension !== '.hbs' && extension !== '.md') return;
        // get file content that contains yaml front-matter
        var content = fs.readFileSync(filename, 'utf8'),
            // get front matter from content
            data = fm(content);
        // if not front matter is found, return
        if (typeof data.attributes.post == 'undefined') return;
        data.attributes.filename = filename;
        files.push(data.attributes);
    });

    return files;
}

function normalizeDir(dir)
{
    /**
     * remove and add a trailing forward slash
     * to prevent malformed paths with multiple trailing slashes
     */
    return dir.replace(/\/$/, '') + '/';
}