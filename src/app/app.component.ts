import { SQLiteObject } from '@ionic-native/sqlite';
import { IUser } from './../interfaces/IUser';
import { IdentityService } from './../providers/identity.service';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SqLiteService } from '../providers/sqLite.service';
import { Constants } from '../utils/Constants';
import { IProducts } from '../interfaces/IProducts';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  currentUser: any;
  pages: Array<{ title: string, component: any }>;
  UNKNOW_USER_IMAGE = Constants.paths.UNKNOW_USER;

  constructor(
    private _platform: Platform,
    private _statusBar: StatusBar,
    private _splashScreen: SplashScreen,
    private _menuCtrl: MenuController,
    private _identitySrv: IdentityService,
    private _sqLiteSrv: SqLiteService
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
      this._createDatabase();
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
  private _createDatabase() {
    this._sqLiteSrv.createDatabase()
      .then(db => this._createProducts(db))
      .then(result => console.log("Database Created: " + result))
      .catch(error => console.log(error));
  }

  private _createProducts(db: SQLiteObject) {
    let databaseInstance = db;
    let entity = Constants.entities.PRODUCTOS;
    return this._sqLiteSrv.createTable(databaseInstance, entity)
      .then(table => {
        let productList = this._buildProductList();
        if (table) {
          productList.forEach(product => {
            return this._sqLiteSrv.save(databaseInstance, product, entity);
          });
        }
      })
      .catch(error => console.log(error));
  }
  private _buildProductList(): IProducts[] {
    return [{
      description: "King Kong 18 Huecos",
      stock: 2465,
      price: 0.62,
      image: "assets/products/king-kong-18.jpg"
    }, {
      description: "King Kong 30% Infes",
      stock: 1245,
      price: 0.80,
      image: "assets/products/king-kong-30.jpg"
    }, {
      description: "Pandereta Raya",
      stock: 3029,
      price: 0.52,
      image: "assets/products/pandereta-raya.jpg"
    }, {
      description: "Pandereta Lisa (Grande)",
      stock: 465,
      price: 1.00,
      image: "assets/products/pandereta-lisa.jpg"
    }, {
      description: "Hueco de 15 (Liso)",
      stock: 365,
      price: 1.98,
      image: "assets/products/hueco-15-liso.jpg"
    }, {
      description: "Hueco de 15 Raya",
      stock: 265,
      price: 1.98,
      image: "assets/products/hueco-15-raya.jpg"
    }, {
      description: "Hueco de 20 (Liso)",
      stock: 1165,
      price: 1.90,
      image: "assets/products/hueco-20-liso.jpg"
    }, {
      description: "Hueco de 12 (Liso)",
      stock: 705,
      price: 1.95,
      image: "assets/products/hueco-12-liso.jpg"
    }, {
      description: "Hueco de 8 (Carachita)",
      stock: 665,
      price: 1.30,
      image: "assets/products/hueco-8-carachita.jpg"
    }, {
      description: "Pastelero Liso/Raya",
      stock: 322,
      price: 2.10,
      image: "assets/products/pastelero-liso-raya.jpg"
    }];
  }
}