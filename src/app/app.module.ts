import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ToDoComponent } from './to-do/to-do.component';
import { ProductsComponent } from './products/products.component';
import { FooterComponent } from './footer/footer.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ToDoListComponent } from './to-do/to-do-list/to-do-list.component';
import { ToDoListItemComponent } from './to-do/to-do-list/to-do-list-item/to-do-list-item.component';
import { ToDoFormComponent } from './to-do/to-do-form/to-do-form.component';
import { WeatherThreeComponent } from './weather-three/weather-three.component';
import { WeatherCarouselComponent } from './weather-three/weather-carousel/weather-carousel.component';

import { ProductService } from './products/product.service';
import { ToDoService } from './to-do/to-do.service';
import { WeatherService } from './shared/weather.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToDoComponent,
    ProductsComponent,
    FooterComponent,
    ProductItemComponent,
    ToDoListItemComponent,
    ToDoFormComponent,
    ToDoListComponent,
    WeatherThreeComponent,
    WeatherCarouselComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [ProductService, ToDoService, WeatherService],
  bootstrap: [AppComponent],
  entryComponents: [WeatherCarouselComponent]
})
export class AppModule { }
