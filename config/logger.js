const reqSerializer = require('../src/interfaces/http/logger/reqSerializer').reqSerializer;
const resSerializer = require('../src/interfaces/http/logger/resSerializer').resSerializer;

const path = require('path');
const logPath = path.join(__dirname, '/logs/development.log');


const config = {
    'development': {
        name : 'myapp',
        streams : [
            {
                level: 'trace',
                stream: process.stdout
            },
            // {
            //     level: 'error',
            //     path: logPath
            // }
        ],
        src : false,
        serializers: {
            req: reqSerializer,
            res : resSerializer
        },
    },
    'production' : {
        name : process.env.APP_NAME,
        streams : [
            {
                level: 'trace',
                stream: process.stdout
            }
        ],
        src : false,
        serializers: {
            req: reqSerializer,
            res : resSerializer
        },
    }
};

exports.get = function (env) {
    return config[env] || {};
}