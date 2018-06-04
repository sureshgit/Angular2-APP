//import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustBaseComponent } from './cust-base/cust-base.component';
import { NotFoundComponent } from '../errors/not-found/not-found.component';
import { CustProfileComponent } from './cust-profile/cust-profile.component';

const customerRoutes: Routes = [
     {
        path: 'customer',
        component : CustBaseComponent,
        children : [
          {
            path: '',
            component : CustProfileComponent
          },
          {
            path: 'profile',
            component : CustProfileComponent
          }
        ]
      }
];

export const customerRouting = RouterModule.forChild(customerRoutes);
