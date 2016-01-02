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

module.exports = function GenerateRss(grunt)
{
    // content path/source
    var rss_source = normalizeDir(path.resolve('app/content'));
    // where rss.xml file be saved to?
    var rss_file = path.resolve('dist/rss.xml');
    // how many posts to show in the feed?
    var feed_post_limit = 20;

    // rss settings
    var content_url = 'http://blog.kulinarian.com/';
    var content_url_dir = 'posts/{{dir}}/';
    var url_extension = '.html';
    var author = 'Kulinarian'; // can be overwritten by yaml data (author)

    // create the feed, with feed meta data
    var feed = new RSS({
        title: 'Kulinarian Blog: Food, Recipes, and Tech',
        description: 'Articles on food, recipes, and tech from the creators of Kulinarian.com',
        feed_url: 'http://blog.Kulinarian.com/rss.xml',
        site_url: 'http://blog.Kulinarian.com'
    });

    // get post data from the source files
    var files = getSourceFiles(rss_source);

    // order/sort the files by timestamp, newest post is at the top
    files.sort(function(a, b) {
        return b.timestamp - a.timestamp;
    })

    // create feed items from the source files
    var item_data = {};

    // set the feed limit
    feed_post_limit = (files.length > feed_post_limit) ? feed_post_limit : files.length;

    for (var i = 0; i < feed_post_limit; i++) {
        item_data = {};

        item_data.title = files[i].title;
        item_data.description = files[i].description;
        item_data.url = getPostUrl(content_url, content_url_dir, files[i].filename, url_extension);
        item_data.author = (typeof files[i].author != 'undefined') ? files[i].author : author;

        if (typeof files[i].posted != 'undefined') item_data.date = files[i].posted;

        // add the data to the feed
        feed.item(item_data);
    }

    // save the xml file
    fs.writeFileSync(rss_file, feed.xml(), "utf8");
};

function getPostUrl(url, url_dir, filename, url_extension)
{
    // get any special directives in the file path
    url_dir = parseSpecialDir(url_dir, filename);
    // get the url content name from the filename
    filename = filename.split('/');
    filename = filename[filename.length - 1];
    // remove the file extension
    filename = filename.split('.');
    filename = filename[0];
    return normalizeDir(url) + normalizeDir(url_dir) + filename + url_extension;
}

function parseSpecialDir(url_dir, filename)
{
    // get a special directive for match directories
    var special = url_dir.match(/{{.*?}}/);
    // if none is found, return original filename
    if (special === null) return url_dir;
    // remove the syntax used for identifying the special param
    special = special[0].replace(/({+|}+)/g, '');

    // for matching a directory name within the original file path
    if (special === 'dir') {
        // explode the filename into an array
        var name = filename.split('/'),
            // explode the special url path into an array
            match_dir = url_dir.split('/');
        // get the first path that we want to match
        match_dir = match_dir[0];
        // iterate over the directories in the filename path to match the match_dir
        for (var i = 0; i < name.length; i++) {
            // if the match is found
            if (name[i] === match_dir) {
                // return the match_dir with the new directory name from the file name
                return match_dir + '/' + name[i + 1];    
            }
        }
    }

    // if nothing is found above, return the original path
    return url_dir;
}

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
        // if no front matter is found, return
        if (typeof data.attributes.title == 'undefined') return;
        // if the rss flag is found and set to false
        if (typeof data.attributes.rss == 'boolean' && data.attributes.rss === false ) return;
        // ensure the posted date exists for ordering the rss feed
        if (typeof data.attributes.posted == 'undefined') return;
        // get the epoch timestamp from the posted date for sorting
        data.attributes.timestamp = new Date(data.attributes.posted).getTime();
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