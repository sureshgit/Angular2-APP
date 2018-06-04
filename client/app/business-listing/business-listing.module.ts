import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessListingComponent } from './business-listing.component';
import { businessListingRouting } from './business-listing.routing';
import { BusinessFiltersComponent } from './business-filters/business-filters.component';
import { BusinessResultComponent } from './business-result/business-result.component';
import { BusinessResultBaseComponent } from './business-result-base/business-result-base.component';
import { BusinessDetailsComponent } from './business-details/business-details.component';

import { BusinessService } from './services/business-service';
//import { LocaleService, LocalizationModule, TranslationService } from 'angular-l10n';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
//import { AtlasSharedModule } from "../shared/atlas-shared.module";
import { FormBuilderService } from "../shared/services/form-builder.service";

import { EffectsModule } from '@ngrx/effects';
import { BusinessesListEffects } from '../business-listing/effetcs/business.list.effects';

@NgModule({
  imports: [
    CommonModule,
    businessListingRouting,
    ReactiveFormsModule,
    //AtlasSharedModule,
    //LocalizationModule.forChild(),
    EffectsModule.run(BusinessesListEffects),
  ],
  declarations: [BusinessListingComponent, BusinessFiltersComponent, BusinessResultComponent, BusinessResultBaseComponent, BusinessDetailsComponent],
  exports: [ BusinessListingComponent],
  providers: [ BusinessService, FormBuilderService]
})
export class BusinessListingModule { }

