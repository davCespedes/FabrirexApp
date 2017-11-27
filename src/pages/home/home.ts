import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Constants } from './../../utils/Constants';
import { FirebaseService } from './../../providers/firebase.service';
import { IdentityService } from './../../providers/identity.service';
import { IUser } from './../../interfaces/IUser';
import { IGooglePlusResponse } from './../../interfaces/IGooglePlusResponse';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { ToastrService } from './../../providers/toastr.service';

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
  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _toastrSrv: ToastrService,
    private _identitySrv: IdentityService,
    private _firebaseSrv: FirebaseService
  ) {
    // this.currentUser = this._navParams.get("currentUser");
    this.currentUser = this._identitySrv.user;
  }
  showToastr() {
    this._toastrSrv.show("This is a Toast Example");
  }
  private _formatFireBaseData(items: any[]): any[] {
    return items.map(item => {
      return { [item.key]: item.val() };
    });
  }

  private _saveCurrentUser() {
    this.firebaseList.push(this._identitySrv.user);
  }

}
