import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustBaseComponent } from './cust-base/cust-base.component';
import { CustProfileComponent } from './cust-profile/cust-profile.component';
import { customerRouting } from './customer.routing';
import { CustomerComponent } from './customer.component';

@NgModule({
  imports: [
    CommonModule,
    customerRouting
  ],
  declarations: [
    CustBaseComponent,
    CustProfileComponent,
    CustomerComponent
  ]
})
export class CustomerModule { }
