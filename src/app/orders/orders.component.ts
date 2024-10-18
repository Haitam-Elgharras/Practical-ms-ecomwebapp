import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orders: any;

  constructor(private httpclient: HttpClient, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    console.log('Getting customers');
    this.httpclient.get('http://localhost:8088/order-service/orders/search/byCustomerId?projection=fullOrder&customerId=' + this.route.snapshot.params['customerId'])
      .subscribe({
        next: (data:any) => {
          // Because when using HATEOAS, the data is wrapped in a _embedded object
          this.orders = data._embedded.orders;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  orderDetails(orderId: any) {
    this.router.navigateByUrl('/order-details/' + orderId);
  }


}
