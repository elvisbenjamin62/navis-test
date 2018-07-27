import {Component, OnDestroy, OnInit} from '@angular/core';


import * as $ from 'jquery';
import {WeatherService} from '../shared/weather.service';
import {Subscription} from 'rxjs';
import {Weather} from '../shared/weather.model';

@Component({
  selector: 'app-weather-two',
  templateUrl: './weather-two.component.html',
  styleUrls: ['./weather-two.component.css']
})
export class WeatherTwoComponent implements OnInit, OnDestroy {

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

      setTimeout(
      ()=> { console.log('hello');
        $('.carousel-showmanymoveone .item').each(function(){
          var itemToClone = $(this);

          for (var i=1;i<3;i++) {
            itemToClone = itemToClone.next();

            // wrap around if at end of item collection
            if (!itemToClone.length) {
              itemToClone = $(this).siblings(':first');
            }

            // grab item, clone, add marker class, add to collection
            itemToClone.children(':first-child').clone()
              .addClass("cloneditem-"+(i))
              .appendTo($(this));
          }
        });
      }, 100);

  }

}
