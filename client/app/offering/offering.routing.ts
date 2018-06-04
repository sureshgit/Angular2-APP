import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferingComponent} from './offering.component';


const offerListingRoutes: Routes = [
    {
        path: 'offering',
        component: OfferingComponent,
        children : [
            {
                path: '',
                component: OfferingComponent,
            },
            {
                path: 'search/:term',
                component: OfferingComponent,
            },
            {
                path: ':offeringId/:offeringtitle',
                component: OfferingComponent,
            }
        ]
    }
];
export const offerListingRouting = RouterModule.forChild(offerListingRoutes);
