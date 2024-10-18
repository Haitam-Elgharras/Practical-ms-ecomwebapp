import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  constructor(private httpclient: HttpClient, private router: Router) { }

  customers: any;

  ngOnInit(): void {
    console.log('Getting customers');
    this.httpclient.get('http://localhost:8088/customer-service/customers')
      .subscribe({
        next: (data:any) => {
          // Because when using HATEOAS, the data is wrapped in a _embedded object
          this.customers = data._embedded.customers;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  getOrders(customerId: number) {
    this.router.navigateByUrl(`/orders/${customerId}`);
  }

}
