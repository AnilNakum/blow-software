import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services';
import { Router } from "@angular/router";

declare var Razorpay: any;



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  private razorpayOptions: any;
  paymentData: any = {};

  constructor(public commonService: CommonService, private _router: Router) {
    this.razorpayOptions = {
      key: 'rzp_test_PLBSqTvWFodKWu', 
      name: 'Demo App',
      description: 'Payment',
      image:'assets/img/rozarpay.jpg',
      handler: this.paymentHandler.bind(this),
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com'
      },
      
      theme: {
        color: '#00bcd4'
      }
    };
  }

  ngOnInit(): void {
  }

  initiatePayment(paymentForm:any): void {
    this.razorpayOptions.amount = this.paymentData.paymentAmount * 100;
    const razorpayInstance = new Razorpay(this.razorpayOptions);
    razorpayInstance.open();
    paymentForm.resetForm();
  }

  paymentHandler(response: any): void {
    console.log(response);
    this.commonService.showSuccessToast('Payment Done.');
  }

}
