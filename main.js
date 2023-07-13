'use strict';

const http = require('node:http');
const { keyAPI } = require('./config.js');



class City {  
    constructor(unit, ...args) {
        (async () => {
            this.meta = new MetaCity(unit, ...args);
            this.weather = await this.meta.getWeather();
            this.proccesing = new TreatmentWeather(this.weather);
            this.data = Object.assign(this.weather, this.proccesing);
            
        })();
        delete this.meta;
        delete this.weather;
        delete this.proccesing;
    }
}

class TreatmentWeather {
    constructor(data) {
        Object.assign(this, data);
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
    
}

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


// (async () => {

//     const kirov = new MetaCity('metric', 58.60, 49.66);
//     const moscow = new MetaCity('metric', 'Moscow');
//     const moscowWeather = await moscow.getWeather();
//     const kirovWeather = await kirov.getWeather();
//     const proccesingKirov = new TreatmentWeather(kirovWeather)
//     console.dir(proccesingKirov, {depth: 4})

// })();

const kirov = new City('metric', 'Kirov');

console.log(kirov)

