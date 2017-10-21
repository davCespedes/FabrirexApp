import { IUser } from './../interfaces/IUser';
import { IdentityService } from './../providers/identity.service';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  currentUser: any;

  pages: Array<{ title: string, component: any }>;

  constructor(
    private _platform: Platform,
    private _statusBar: StatusBar,
    private _splashScreen: SplashScreen,
    private _menuCtrl: MenuController,
    private _identitySrv: IdentityService
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this._platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this._statusBar.styleDefault();
      this._splashScreen.hide();
      this._getAppUser();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(this.currentUser);
    this.nav.setRoot(page.component);
  }
  private _getAppUser() {
    this._identitySrv.getCurrentUser()
      .then(user => {

        if (user && user._id) {
          this._identitySrv.user = user;
          this.rootPage = HomePage;
          this._setCurrentUser(user);
        }
        this._identitySrv.subscriber
          .subscribe(user => {
            this._setCurrentUser(user);
          });
      });
  }

  private _setCurrentUser(user: IUser): void {
    if (user) this.currentUser = user;
  }
}