import { IGooglePlusResponse } from './../../interfaces/IGooglePlusResponse';
import { IUser } from './../../interfaces/IUser';
import { IdentityService } from './../../providers/identity.service';
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
        private _authSrv: AuthService,
        private _identitySrv: IdentityService
    ) { }
    login() {
        this._authSrv.loginWithGooglePlus()
            .then(googlePlusUser => {
                this._identitySrv.user = this._buildCurrentUser(googlePlusUser);
                this._navCtrl.setRoot(HomePage);
            })
            .catch(error => console.log("Error: " + error));
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
}