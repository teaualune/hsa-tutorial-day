var config = require('./jade.compile.template.config.json');

module.exports = function (dest, src) {

    var jsonData,
        cfg = config[src[0]],
        jsonPath;

    if (cfg && cfg.data) {
        jsonPath = './' + cfg.data;
    } else {
        jsonPath = './' + src[0].substring(0, src[0].length - 4) + 'json';
    }

    try {
        jsonData = require(jsonPath);
    } catch (e) {
        jsonData = null;
    }
    return jsonData;
};
