import { Injectable } from '@angular/core';
import {Weather} from './weather.model';
import {Http, Response} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';


@Injectable()
export class WeatherService {
  private cities = ['Oakland', 'Austin', 'New York', 'Phoenix'];
  private weatherCities: Weather[] = [];
  readonly URL = 'http://api.openweathermap.org/data/2.5/weather';
  readonly APPID =  '892d32a9ba54f35f38773b0889e86ecd';
  readonly UNITS = 'Imperial';
  weatherUpdated = new Subject<Weather[]>();
  // http://api.openweathermap.org/data/2.5/weather?APPID=892d32a9ba54f35f38773b0889e86ecd&q=London
  constructor(private http: Http) {
   this.getWeatherFromAPI(this.cities);
  }
  getWeatherFromAPI(cities: string[]) {
    for (const city of cities) {
      this.http.get(this.URL, {'params': {'APPID': this.APPID, 'q': city, 'units': this.UNITS }})
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
        }).subscribe((weather: Weather) => {
        this.addWeather(weather);
        // sfor weather 2
        if(this.weatherCities.length === this.cities.length) {
          this.weatherUpdated.complete();
        }
        },
        (error: Response) => this.weatherUpdated.error(error.json()));
    }
  }
  addWeather(weather: Weather) {
    this.weatherCities.push(weather);
    this.weatherUpdated.next(this.getWeather());
  }
  getWeather() {
    return this.weatherCities.slice();
  }
}
