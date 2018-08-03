import { Injectable } from '@angular/core';
import {Weather} from '../shared/weather.model';
import 'rxjs/add/operator/map';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WeatherService {

  readonly URL = 'http://api.openweathermap.org/data/2.5/weather';
  readonly APPID =  '892d32a9ba54f35f38773b0889e86ecd';
  readonly UNITS = 'Imperial';
  // http://api.openweathermap.org/data/2.5/weather?APPID=892d32a9ba54f35f38773b0889e86ecd&q=London

  constructor( private httpClient: HttpClient) {}

  getWeatherFromAPI(cities: string[]) {
    return forkJoin(
    cities.map((city: string) => {
      return this.httpClient.get(this.URL,
        {'params': {'APPID': this.APPID, 'q': city, 'units': this.UNITS },
          observe: 'response',
          responseType: 'json'
      })
    .map(
      (response) => {
        const weatherObject = response.body;
        // constructor(name: string, temperature: number, description: string, icon: string, windSpeed: string)
        const weather =  new Weather(
          weatherObject['name'],
          weatherObject['main']['temp'],
          weatherObject['weather'][0]['description'],
          weatherObject['weather'][0]['icon'],
          weatherObject['wind']['speed']);
        return weather;
      }); }));
  }
}
