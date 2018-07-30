import { Injectable } from '@angular/core';
import {Weather} from './weather.model';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {forkJoin} from 'rxjs/observable/forkJoin';

@Injectable()
export class WeatherService {

  readonly URL = 'http://api.openweathermap.org/data/2.5/weather';
  readonly APPID =  '892d32a9ba54f35f38773b0889e86ecd';
  readonly UNITS = 'Imperial';
  // http://api.openweathermap.org/data/2.5/weather?APPID=892d32a9ba54f35f38773b0889e86ecd&q=London

  constructor(private http: Http) {}

  getWeatherFromAPI(cities: string[]) {
    return forkJoin(
    cities.map((city: string) => {
      return this.http.get(this.URL, {'params': {'APPID': this.APPID, 'q': city, 'units': this.UNITS }})
    .map(
      (response: Response) => {
        const weatherObject = response.json();
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
