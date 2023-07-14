'use strict';

const http = require('node:http');

const { keyAPI } = require('./config.js');

const getWeatherAsync = (url) => new Promise((resolve, reject) => {
    const chunks = [];
    http.get(url, (res) => {
        res.on('data', (chunk) => {
            chunks.push(chunk);
        })
        res.on('end', () => {
            const data = Buffer.concat(chunks).toString();
            const result = JSON.parse(data);
            resolve(result);
        })
        res.on('err', (err) => {
            reject(err);
        });
    });
});

const parameters = {
    name: 'q=',
    lat: 'lat=',
    units: '&units=',
    lon: '&lon=',
    api: '&appid=',
}

class WeatherAPI {
    constructor(name) {
        this._url = 'http://api.openweathermap.org/data/2.5/weather?';
        this._key = keyAPI;
        this.name = name;
        this.unit = 'metric';
        this.url = this._url + parameters['name'] + this.name + parameters['api'] + this._key + parameters['units'] + this.unit;
    };

    setLatLon(lat, lon) {
        if (lat < -90 && lat > 90) throw new Error('Incorrect latitude. Range: -90 to 90');
        if (lon < -180 && lon > 180) throw new Error('Incorrect longitude. Range: -180 to 180');
        this.lat = lat;
        this.lon = lon;
        this.url = this._url + parameters['lat'] + lat + parameters['lon'] + lon + parameters['api'] + this._key + parameters['units'] + this.unit;
    };

    reset() {
        const object = new WeatherAPI(this.name);
        for (const key in this) {
            delete this[key];
        }
        Object.assign(this, object);
    }

    async getWeather() { 
        try {
            const weather = await getWeatherAsync(this.url)
            this.data = weather;
        } catch (error) {
            throw new Error(error);
        }
    }

};

module.exports = { WeatherAPI }