import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { FormsModule } from "@angular/forms";
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PaymentModule { }
