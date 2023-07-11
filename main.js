'use strict';

const http = require('node:http');
const { keyAPI } = require('./config.js');



class MetaCity {
    constructor(...args) {
        this._url = 'http://api.openweathermap.org/data/2.5/weather?';
        
        this._parameters = {
            name: 'q=',
            api: `&appid=${keyAPI}`,
        };

        if (args.length > 3 || args.length === 0) throw Error('Invalid number of arguments');

        if (typeof args[0] === 'string') {
            this.name = args[0]
            this.url = this._url + this._parameters['name'] + args[0] + this._parameters['api'];
        }
        else {
            if (typeof args[0] === 'number' && typeof args[1] === 'number') {
                this.latitude = args[0];
                this.longitude = args[1];
                this.url = this._url + `lat=${this.latitude}&lon=${this.longitude}` + this._parameters['api'];
            } else {
                throw Error('Incorrect use of the class MetaCity')
            };
        }
    };

    async getWeather() {
        class City {
            constructor(data) {
                this.data = data;
            }
        }
        const object = await fetchWeather(this.url)
        return new City(object)
    }
};



const fetchWeather = (url) => new Promise((resolve, reject) => {
    http.get(url, (res) => {
        const code = res.statusCode;
        if (code !== 200) return reject(new Error(`HTTP status code ${code}`))

        res.on('error', reject)

        const chunks = [];
        res.on('data', (chunk) => {
            chunks.push(chunk);
        })

        res.on('end', () => {
            const json = Buffer.concat(chunks).toString();
            try {
                const object = JSON.parse(json);
                resolve(object);
            } catch (error) {
                return reject(error);
            }
        })
        
    })
});


(async () => {

    const kirov = new MetaCity('Kirov');
    const moscow = new MetaCity('Moscow');
    const moscowWeather = await moscow.getWeather();
    const kirovWeather = await kirov.getWeather();
    console.log(moscowWeather)

})();