import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderDetails :any;
  orderId!:number;
  constructor(private http:HttpClient, private router: Router, private route:ActivatedRoute) {
    this.orderId=route.snapshot.params['orderId'];
  }

  ngOnInit(): void {
    this.http.get("http://localhost:8088/order-service/fullOrder/"+this.orderId)
      .subscribe({
        next : (data)=>{
          this.orderDetails=data;
        },
        error : (err)=>{}
      });
  }

  getOrderDetails(o: any) {
    this.router.navigateByUrl("/order-details/"+o.id);
  }
}