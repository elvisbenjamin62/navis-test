import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Weather} from '../shared/weather.model';
import {WeatherService} from '../shared/weather.service';
import {WeatherCarouselComponent} from './weather-carousel/weather-carousel.component';


@Component({
  selector: 'app-weather-three',
  templateUrl: './weather-three.component.html',
  styleUrls: ['./weather-three.component.css']
})
export class WeatherThreeComponent implements OnInit, OnDestroy {
  readonly cities = ['Oakland', 'Austin', 'New York', 'Phoenix'];
  @ViewChild('entry', {read: ViewContainerRef }) entry: ViewContainerRef;
  componentRef: ComponentRef<WeatherCarouselComponent>;
  constructor(private weatherService: WeatherService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.weatherService
      .getWeatherFromAPI(this.cities)
      .subscribe(
        (weatherCities: Weather[]) => {
          this.renderCarousel(weatherCities); },
        (error) => {this.renderCarousel([], {'occurred': true, 'description': error.json().message}); }
      );
  }

  renderCarousel(weatherCities: Weather[], error = {'occurred': false, 'description': ''}) {
    this.entry.clear();
    const weatherCarouselFactory = this.componentFactoryResolver.resolveComponentFactory(WeatherCarouselComponent);
    this.componentRef = this.entry.createComponent(weatherCarouselFactory);
    this.componentRef.instance.weatherCities = weatherCities;
    this.componentRef.instance.error = error;
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
