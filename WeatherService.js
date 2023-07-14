'use strict';

const { WeatherAPI } = require('./WeatherAPI.js');

class WeatherService extends WeatherAPI {
    constructor(name) {
        super(name);
    }
    get temp() {
        return { temp: this.data.main.temp };
    }
    get feels() {
        return { feels: this.data.main.feels_like };
    }
    get tempMin() {
        return { tempMin: this.data.main.temp_min };
    }
    get tempMax() {
        return { tempMax: this.data.main.temp_max };
    }
    get pressure() {
        return { pressure: this.data.main.pressure };
    }
    get humidity() {
        return { humidity: this.data.main.humidity };
    }
    get seaLevel() {
        return { seaLevel: this.data.main.sea_level };
    }
    get groundLevel() {
        return { groundLevel: this.data.main.grnd_level };
    }
    get coord() {
        return { coord: this.data.coord };
    }
    get visibility() {
        return { visibility: this.data.visibility };
    }
    get speedWind() {
        return { speedWind: this.data.wind.speed };
    }
    get country() {
        return { country: this.data.sys.country };
    }
};

module.exports = { WeatherService }