'use strict';

const { WeatherService } = require('./WeatherService.js');

(async () => {
    const kirov = new WeatherService('Kirov');
    await kirov.getWeather()
    console.log(kirov.temp);
})()

