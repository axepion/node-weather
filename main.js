'use strict';

const http = require('node:http');
const { keyAPI } = require('./config.js');

const url = `https://api.openweathermap.org`;
const options = {
    hostname: 'http://api.openweathermap.org',
    path: `/data/2.5/weather?lat=33.44&lon=-94.04&exclude=current&appid=${keyAPI}/`,
    method: 'PATH',
    headers: {
        'Content-Type': 'application/json',
    }
}

http.get(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=58.35&lon=49.39&exclude=current&appid=${keyAPI}`, (res) => {
    const data = [];    
    res.on('data', data => {
        console.log(data.toString());
    })
})