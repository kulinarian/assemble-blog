
var environment = require('./.environment.js');

module.exports.concat = function(str_a, str_b)
{
    return str_a + str_b
}

module.exports.siteUrl = function(path, ssl)
{
    path = (typeof path == 'string') ? path.replace(/(^\/|\/$)/g, '') : '';
    protocol = ssl === true ? 'https://' : 'http://';
    return protocol + environment.blog_url + '/' + path;
}

/**
 * this is for pointing people to our product, instead of this blog
 *
 * @param  {[type]} path [description]
 * @param  {[type]} ssl  [description]
 * @return {[type]}      [description]
 */
module.exports.appUrl = function(path, ssl)
{
    path = (typeof path == 'string') ? path.replace(/(^\/|\/$)/g, '') : '';
    protocol = ssl === true ? 'https://' : 'http://';
    return protocol + environment.app_url + '/' + path;
}

module.exports.assetCdn = function(path)
{
    path = (typeof path == 'string') ? '/' + path.replace(/(^\/|\/$)/g, '') : '';
    return environment.asset_cdn + path;
}

/**
 * remove the 'dist' from our urls
 * @return {[type]} [description]
 */
module.exports.pageUrl = function(url)
{
    return module.exports.siteUrl(url.replace(/dist\//, ''));
}
