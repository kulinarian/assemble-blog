
var environment = require('./.environment.js');

module.exports.concat = function(str_a, str_b)
{
    return str_a + str_b
}

module.exports.site_url = function(path)
{
    path = (typeof path == 'string') ? path.replace(/(^\/|\/$)/g, '') : '';
    return 'http://' + environment.blog_url + '/' + path;
}

module.exports.asset_cdn = function()
{
    return environment.asset_cdn;
}
