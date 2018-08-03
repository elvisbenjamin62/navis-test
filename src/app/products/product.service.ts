import {Injectable} from '@angular/core';
import {Product} from '../shared/product.model';

@Injectable()
export class ProductService  {
  private products: Product[] = [];
  constructor() {
    this.products.push(new Product('../assets/images/1.jpg', '1 Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
      'Beatae debitis dolore eligendi error nemo nostrum porro totam.' +
      ' Eum incidunt, nulla. Asperiores cum illo labore neque nesciunt,' +
      ' ratione sed vel vitae.'));
    this.products.push(new Product('../assets/images/2.jpg', '2 Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
      'Beatae debitis dolore eligendi error nemo nostrum porro totam.' +
      ' Eum incidunt, nulla. Asperiores cum illo labore neque nesciunt,' +
      ' ratione sed vel vitae.'));
    this.products.push(new Product('../assets/images/3.jpg', '3 Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
      'Beatae debitis dolore eligendi error nemo nostrum porro totam.' +
      ' Eum incidunt, nulla. Asperiores cum illo labore neque nesciunt,' +
      ' ratione sed vel vitae.'));
    this.products.push(new Product('../assets/images/4.jpg', '4 Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
      'Beatae debitis dolore eligendi error nemo nostrum porro totam.' +
      ' Eum incidunt, nulla. Asperiores cum illo labore neque nesciunt,' +
      ' ratione sed vel vitae.'));
  }

  getProducts() {
    return this.products.slice();
  }
}
