import { IGooglePlusResponse } from './../../interfaces/IGooglePlusResponse';
import { IUser } from './../../interfaces/IUser';
import { IdentityService } from './../../providers/identity.service';
import { AuthService } from './../../providers/auth.service';
import { HomePage } from './../home/home';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { SqLiteService } from '../../providers/sqLite.service';
import { SignInPage } from '../signIn/signIn';
import { ToastrService } from '../../providers/toastr.service';

@Component({
    selector: 'login-page',
    templateUrl: 'login.html'
})
export class LoginPage {
    user: any = {};
    constructor(
        private _navCtrl: NavController,
        private _authSrv: AuthService,
        private _identitySrv: IdentityService,
        private _sqLiteSrv: SqLiteService,
        private _toastrSrv: ToastrService
    ) {
        this._buildUserLoginOptions();
    }

    signIn() {
        this._navCtrl.push(SignInPage);
    }

    standarLogin() {
        this._sqLiteSrv.createDatabase()
            .then(db => {
                console.log(db);
                return this._sqLiteSrv.getSessionUserData(db, this.user);
            })
            .then((user: any) => {
                if (user) {
                    let currentUser = this._buildCurrentUser(user.rows.item(0));
                    this._identitySrv.user = currentUser;
                    this._navCtrl.setRoot(HomePage);
                } else this._toastrSrv.show("Usuario no encontrado");
            })
            .catch(error => console.log(error));
    }
    loginWithGoogle() {
        // this._navCtrl.setRoot(HomePage);
        this._authSrv.loginWithGooglePlus()
            .then(googlePlusUser => {
                this._identitySrv.user = this._buildCurrentGoogleUser(googlePlusUser);
                this._navCtrl.setRoot(HomePage);
            })
            .catch(error => console.log("Error: " + error));
    }
    private _buildUserLoginOptions() {
        this.user.username = "";
        this.user.password = "";
    }
    private _buildCurrentGoogleUser(user: IGooglePlusResponse): IUser {
        return {
            _id: user.userId,
            firstName: user.givenName,
            lastName: user.familyName,
            profileImage: user.imageUrl,
            username: user.email
        }
    }
    private _buildCurrentUser(user: any) {
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            username: user.username
        }
    }
}