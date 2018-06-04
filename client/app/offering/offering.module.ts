import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferingComponent } from './offering.component';
import { offerListingRouting } from './offering.routing';


@NgModule({
  imports: [
    CommonModule,
    offerListingRouting
  ],
  declarations: [OfferingComponent]
})
export class OfferingModule { }
