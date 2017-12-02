import { IProducts } from './../../interfaces/IProducts';
import { SqLiteService } from './../../providers/sqLite.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Constants } from './../../utils/Constants';
import { FirebaseService } from './../../providers/firebase.service';
import { IdentityService } from './../../providers/identity.service';
import { IUser } from './../../interfaces/IUser';
import { IGooglePlusResponse } from './../../interfaces/IGooglePlusResponse';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { ToastrService } from './../../providers/toastr.service';
import { RequestPage } from '../request/request';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentUser: IUser;
  collections = Constants.entities;
  firebaseList: FirebaseListObservable<any>;
  users: any[];
  UNKNOW_USER_IMAGE = Constants.paths.UNKNOW_USER;
  products: IProducts[] = [];
  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _toastrSrv: ToastrService,
    private _identitySrv: IdentityService,
    private _firebaseSrv: FirebaseService,
    private _sqLiteSrv: SqLiteService
  ) {
    this.currentUser = this._identitySrv.user;
    this._getProducts();
  }
  ionViewWillEnter() {
  }
  goToRequest() {
    this._navCtrl.push(RequestPage);
  }
  private _formatFireBaseData(items: any[]): any[] {
    return items.map(item => {
      return { [item.key]: item.val() };
    });
  }

  private _getProducts() {
    let entity = Constants.entities.PRODUCTOS;
    this._sqLiteSrv.createDatabase()
      .then(db => this._sqLiteSrv.getDataByEntity(db, entity))
      .then(productList => {
        let tempList = [];
        for (let i = 0; i < productList.rows.length; i++) {
          tempList.push(productList.rows.item(i));
        }
        this.products = tempList;
      })
  }

  private _saveCurrentUser() {
    this.firebaseList.push(this._identitySrv.user);
  }

}
