import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BaseLayoutComponent } from '../base-layout/base-layout.component';
import { BannerComponent } from '../home/banner/Banner.component';
import { LoginComponent } from '../Auth/login/Login.component';
import { HomeComponent } from '../home/home/Home.component';
import { AboutComponent } from '../home/about/About.component';
import { ContactComponent } from '../home/contact/Contact.component';
import { NotFoundComponent } from '../errors/not-found/not-found.component';
import { BrowsebyCategoriesComponent } from '../home/browseby-categories/browseby-categories.component';
import { FeaturedListingComponent } from '../home/featured-listing/featured-listing.component';
import { AboutServicesComponent } from '../home/about-services/about-services.component';
import { FooterComponent } from '../base-layout/footer/footer.component';
import { MessengerService } from '../shared/services/messenger.service';
import { appRoutes } from './app.routing';
import { BusinessListingModule } from '../business-listing/business-listing.module';
import { CustomerModule } from '../customer/customer.module';
import { OfferingModule } from '../offering/offering.module';

import { PublisherModule } from '../publisher/publisher.module';
import { SSAppPreloadStrategy } from './preload-strategy';
import { CategoryMenuComponent} from '../home/category-menu/category-menu.component';

import { EffectsModule } from '@ngrx/effects';
//import { BusinessesListEffects } from '../business-listing/effetcs/business.list.effects';

import { AuthConfig, authConfigServiceFactory } from '../shared/security/auth-config';
import { RestClientService } from '../shared/data/rest-client.service';
import { LocaleService, LocalizationModule, TranslationModule, TranslationService, LocaleDatePipe } from 'angular-l10n';
import { reducer } from '../shared/reducers/index';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthorizationEffects } from '../shared/effects/authorization.effects';
//import { AuthCallback } from './security/auth-callback.component';
import { AuthGuard } from '../shared/security/auth.guard';
import { AuthorizationService } from '../shared/security/authorization.service';
//import { SelectivePreLoading } from './selective-preloading';
import { PreloadAllModules, RouterModule } from '@angular/router';
//import { AtlasElementsModule } from './../atlas-elements/atlas-elements.module';
import { APP_INITIALIZER, ChangeDetectorRef, ErrorHandler, Injectable, NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { CookieModule } from 'ngx-cookie';
import { RouteParams } from "../shared/services/route-params";
import { DatePipe } from "@angular/common";
import { StorageService } from '../shared/services/storage.service';
import { ClaimsHelperService } from '../shared/helpers/claims-helper';
import { LoaderService } from '../shared/services/navigate-loader.service';
import { LoaderComponent } from '../shared/components/navigate-loader/navigate-loader.component';

//shared
import { SearchFiltersService } from '../shared/services/searchFilters.service';
import { SearchResultService } from '../shared/services/searchresult.service';


 import { ResultOutletComponent } from '../shared/components/result-outlet/result-outlet.component';
 import { ResultBaseComponent } from '../shared/components/result-base/result-base.component';
 import { ResultListComponent } from '../shared/components/result-list/result-list.component';
 import { ResultFilterComponent } from '../shared/components/result-filter/result-filter.component';
 import { SearchResultsEffects } from '../shared/effects/searchresult.effect';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    BannerComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    AboutComponent,
    ContactComponent,
    BrowsebyCategoriesComponent,
    FeaturedListingComponent,
    AboutServicesComponent,
    CategoryMenuComponent,
    FooterComponent,
    LoaderComponent,
    ResultOutletComponent,
    ResultBaseComponent,
    ResultListComponent,
    ResultFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: SSAppPreloadStrategy }),
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    CookieModule.forRoot(),
    EffectsModule.run(AuthorizationEffects),
    BusinessListingModule,
    CustomerModule,
    PublisherModule,
    OfferingModule,
    EffectsModule.run(SearchResultsEffects)
  ],
  exports: [RouterModule],
  providers: [
    //{ provide: ErrorHandler, useClass: AtlasErrorHandler },
    SSAppPreloadStrategy,
    AuthorizationService,
    AuthGuard,
    StorageService,    
    RestClientService,
    {
      provide: AuthConfig,
      useFactory: authConfigServiceFactory,
      deps: []
    },
    ClaimsHelperService,
    RouteParams,
    DatePipe,
    MessengerService,
    LoaderService,
    LocaleDatePipe,
    SearchFiltersService,
    SearchResultService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
