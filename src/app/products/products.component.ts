import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(private httpclient: HttpClient) { }

  products: any;

  ngOnInit(): void {
    console.log('Getting products');
    this.httpclient.get('http://localhost:8088/inventory-service/products')
      .subscribe({
        next: (data:any) => {
          // Because when using HATEOAS, the data is wrapped in a _embedded object
          this.products = data._embedded.products;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

}
