'use strict';

const http = require('node:http');
const { keyAPI } = require('./config.js');



class BuildCity {
    constructor(name, latitude = null, longitude = null) {
        this.url = 'https://api.openweathermap.org';
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        Object.defineProperty(this, this.url, {
            enumerable: false,
            configurable: false,
            writable: false,
        });
    }

    buildFromName(name) {
        const url = 
        return new City(url)
    }
}

class City {
    constructor(url) {
        this.url = url;
    }
}

http.get(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=58.35&lon=49.39&exclude=current&appid=${keyAPI}`, (res) => {   
    res.on('data', data => {
        console.log(data.toString());
    })
})