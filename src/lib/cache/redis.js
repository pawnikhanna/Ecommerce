const redis = require('redis');
let client;

const connectRedis = () => {
    return new Promise((resolve, reject) => {
        client = redis.createClient();
        client.on('connect', function(err, res){
            console.log("Successfully connected to redis");
            return resolve( true );
        });
        client.on('error', function(err, res){
            console.error("Error in connecting to redis",{err});
            return resolve( true );
        });
    });
};

const getValue = (key) =>{
    return new Promise((resolve, reject) => {
        client.get(key, function(err, res){
            if (err) {
                console.error('Error in getting value', {err})
                return reject(new Error('Error in getting the value'))
            }
            console.log("Successfully get value");
            return resolve( res );
        });
    });
};

const setValue = (key, value) => {
    return new Promise((resolve, reject) => {
        client.set(key, value, function(err, res){
            if (err) {
                console.error('Error in setting value', {err})
                return reject(new Error('Error in setting the value'))
            }
            console.log("Successfully set value");
            return resolve( true );
        });
    });
};

module.exports = {
    connectRedis,
    getValue,
    setValue
}