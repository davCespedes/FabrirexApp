import { ProductListPage } from './../pages/product/product-list/product-list';
import { ProductDetailPage } from './../pages/product/product-detail/product-detail';
import { AppNativeModule } from './app.native.module';
import { AppServicesModule } from './app.services.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { MasonryModule } from 'angular2-masonry';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RequestListPage } from '../pages/list/request-list';
import { LoginPage } from './../pages/login/login';
import { SignInPage } from '../pages/signIn/signIn';


import { CsProductListComponent } from '../components/cs-product-list/cs-product-list.component';
import { RequestPage } from '../pages/request/request';
import { CsEmptyPageComponent } from '../components/cs-empty-page/cs-empty-page.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RequestListPage,
    LoginPage,
    SignInPage,
    ProductDetailPage,
    RequestPage,
    ProductListPage,
    //components
    CsProductListComponent,
    CsEmptyPageComponent
  ],
  imports: [
    BrowserModule,
    MasonryModule,
    AppServicesModule,
    AppNativeModule.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //pages
    HomePage,
    RequestListPage,
    LoginPage,
    SignInPage,
    ProductDetailPage,
    RequestPage,
    ProductListPage,
    //components
    CsProductListComponent,
    CsEmptyPageComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
