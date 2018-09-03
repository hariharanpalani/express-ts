const config = {
    "development": {
        port: process.env.PORT || 3001
    },
    "production": {
        port: process.env.PORT
    }
}

exports.get = function (env) {
    return config[env] || {};
}