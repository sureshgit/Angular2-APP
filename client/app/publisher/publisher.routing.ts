import { Routes, RouterModule } from '@angular/router';
import { BusinessComponent } from './business/business.component';

const publisherRoutes: Routes = [
    {
        path: 'publisher',
        component: BusinessComponent,
        children : [
            {
                path: '',
                component: BusinessComponent,
            }
        ]
    }
];
export const publisherRouting = RouterModule.forChild(publisherRoutes);
