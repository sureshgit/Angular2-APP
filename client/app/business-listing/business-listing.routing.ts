import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessListingComponent } from './business-listing.component';
import { BusinessDetailsComponent } from '../business-listing/business-details/business-details.component';
import { BusinessResultBaseComponent } from './business-result-base/business-result-base.component';

const businessListingRoutes: Routes = [
    {
        path: 'business',
        component: BusinessListingComponent,
        children : [
            {
                path: '',
                component: BusinessListingComponent,
            },
            {
                path: ':businessname',
                component: BusinessDetailsComponent,
            },
            {
                path: ':location/search/:term',
                component: BusinessResultBaseComponent,
            },
            {
                path: ':location/:category',
                component: BusinessResultBaseComponent,
            },
            {
                path: ':location/:category/:subcategory',
                component: BusinessResultBaseComponent,
            },            
            {
                path: ':businessname/offering/:offeringtitle',
                component: BusinessDetailsComponent,
            }
        ]
    }
];
export const businessListingRouting = RouterModule.forChild(businessListingRoutes);
