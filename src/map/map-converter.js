'use strict';
const sunCalc = require('suncalc');
// This file is made to convert the map tile from day style tiling to night style tiling
// based on the time.
// This is done by taking local time from given coordinates through sunCalc

export class MapConverter{
  constructor(){
    this.currentMode = 'day';
  }

  convert(lat, lng) {

    let currentTime = new Date();
    let times = sunCalc.getTimes(currentTime, lat, lng);
    if (currentTime <= times.sunrise || currentTime >= times.sunset) {
      this.currentMode = 'night';
    } else {
      this.currentMode = 'day';
    }
  }
   
  get mode(){
    return this.currentMode;
  }

  get tileUrl(){
    let dayTile = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        nightTile = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
    return (this.currentMode === 'day') ? dayTile : nightTile;
  }
  
  get attribution(){
    let dayAtt =
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
        nightAtt = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';  
    return (this.currentMode === 'day') ? dayAtt : nightAtt;
  }

}

