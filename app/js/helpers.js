
var environment = require('./.environment.js');

module.exports.concat = function(str_a, str_b)
{
    return str_a + str_b
}

module.exports.site_url = function(path, ssl)
{
    path = (typeof path == 'string') ? path.replace(/(^\/|\/$)/g, '') : '';
    protocol = ssl === true ? 'https://' : 'http://';
    return protocol + environment.blog_url + '/' + path;
}

module.exports.app_url = function(path, ssl)
{
    path = (typeof path == 'string') ? path.replace(/(^\/|\/$)/g, '') : '';
    protocol = ssl === true ? 'https://' : 'http://';
    return protocol + environment.app_url + '/' + path;
}

module.exports.asset_cdn = function()
{
    return environment.asset_cdn;
}
