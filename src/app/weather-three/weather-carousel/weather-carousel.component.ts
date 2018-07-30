import {AfterViewChecked, AfterViewInit, Component, Input} from '@angular/core';
import {Weather} from '../../shared/weather.model';

declare var $: any;


@Component({
  selector: 'app-weather-carousel',
  templateUrl: './weather-carousel.component.html',
  styleUrls: ['./weather-carousel.component.css']
})
export class WeatherCarouselComponent implements AfterViewInit {

  @Input() weatherCities: Weather[];
  @Input() error = {'occurred': false, 'description': ''};

  readonly imagePath = 'http://openweathermap.org/img/w/';

  constructor() { }

  ngAfterViewInit(): void {
    if (this.error.occurred === false) {
      this.initCarousel();
    }
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
