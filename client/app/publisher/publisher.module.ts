import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business/business.component';
import { publisherRouting } from './publisher.routing';

@NgModule({
  imports: [
    CommonModule,
    publisherRouting
  ],
  declarations: [BusinessComponent]
})
export class PublisherModule { }
