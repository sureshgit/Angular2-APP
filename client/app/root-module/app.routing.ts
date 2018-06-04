import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../Auth/login/Login.component';
import { HomeComponent } from '../home/home/Home.component';
import { AboutComponent } from '../home/about/About.component';
import { ContactComponent } from '../home/contact/Contact.component';
import { NotFoundComponent } from '../errors/not-found/not-found.component';

import {ResultBaseComponent} from '../shared/components/result-base/result-base.component';
import {ResultOutletComponent} from '../shared/components/result-outlet/result-outlet.component';

// redirectTo: 'home',  pathMatch: 'full'
export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'aboutus', component: AboutComponent },
  { path: 'contactus', component: ContactComponent },

  {  path: 'search',
      component: ResultOutletComponent,
      children : [
          {
              path: '',
              component: ResultOutletComponent,
          },
          {
              path: ':lookingfor',
              component: ResultBaseComponent,
          },            
          {
              path: ':lookingfor/:location',
              component: ResultBaseComponent,
          },
          
          {
              path: ':lookingfor/:location/:category',
              component: ResultBaseComponent,
          },
          {
              path: ':lookingfor/:location/:category/:subcategory',
              component: ResultBaseComponent,
          }          
          ]
  },
  {
    path: 'business',
    loadChildren: 'app/business-listing/business-listing.module#BusinessListingModule',
    data: { preload: false }
  },
  {
    path: 'offering',
    loadChildren: 'app/offering/offering.module#OfferingModule',
    data: { preload: false }
  },
  {
    path: 'customer',
    loadChildren: 'app/customer/customer.module#CustomerModule'
  },
  {
    path: 'publisher',
    loadChildren: 'app/publisher/publisher.module#PublisherModule'
  },
  { path: '**', component: NotFoundComponent }
];

// export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
