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
  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _toastrSrv: ToastrService
  ) { }

  ionViewWillEnter() {
    this.currentUser = this._buildCurrentUser(this._navParams.get('googlePlusUser'));
  }
  private _buildCurrentUser(user: IGooglePlusResponse): IUser {
    return {
      _id: user.userId,
      firstName: user.givenName,
      lastName: user.familyName,
      profileImage: user.imageUrl,
      email: user.email
    }
  }
  showToastr() {
    this._toastrSrv.show("This is a Toast Test");
  }
}
