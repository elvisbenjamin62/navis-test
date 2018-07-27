import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../shared/weather.service';
import {Weather} from '../shared/weather.model';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {
  readonly imagePath = 'http://openweathermap.org/img/w/';
  weatherCities: Weather[];
  weatherSubscription: Subscription;
  error = {'occured': false, 'description': ''};
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherCities = this.weatherService.getWeather();
    this.weatherSubscription = this.weatherService.weatherUpdated
      .subscribe((weatherCities: Weather[]) => {this.weatherCities = weatherCities; },
        (error) => {
      this.error.occured = true;
      this.error.description = error.message;
    }
    );
  }

  ngOnDestroy(): void {
    this.weatherSubscription.unsubscribe();
  }

  getImagePath(image: string): string {
    return (this.imagePath + image + '.png');
  }

}
