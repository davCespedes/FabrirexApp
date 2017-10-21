import { AuthService } from './../../providers/auth.service';
import { HomePage } from './../home/home';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'login-page',
    templateUrl: 'login.html'
})
export class LoginPage {
    constructor(
        private _navCtrl: NavController,
        private _authSrv: AuthService
    ) { }
    login() {
        this._authSrv.loginWithGooglePlus()
            .then(googlePlusUser => {
                this._navCtrl.setRoot(HomePage, { googlePlusUser: googlePlusUser });
            })
            .catch(error => console.log("Error: " + error));
    }
}