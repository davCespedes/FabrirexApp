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
  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _toastrSrv: ToastrService,
    private _identitySrv: IdentityService
  ) { }

  ionViewWillEnter() {
    this.currentUser = this._identitySrv.user;
  }
  showToastr() {
    this._toastrSrv.show("This is a Toast Test");
  }

}
