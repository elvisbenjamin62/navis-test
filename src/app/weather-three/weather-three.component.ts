import {Component, OnDestroy, OnInit} from '@angular/core';
import {Weather} from '../shared/weather.model';
import {Subscription} from 'rxjs/Subscription';
import {WeatherService} from '../shared/weather.service';


declare var $: any;


@Component({
  selector: 'app-weather-three',
  templateUrl: './weather-three.component.html',
  styleUrls: ['./weather-three.component.css']
})

export class WeatherThreeComponent implements OnInit, OnDestroy {

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
        },
        () => { this.initCarousel();}
        );
  }

  ngOnDestroy(): void {
    this.weatherSubscription.unsubscribe();
  }

  getImagePath(image: string): string {
    return (this.imagePath + image + '.png');
  }

  initCarousel() {
    setTimeout(   () => {
      $('.myCarousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]

      });
    }, 100);
  }


}
