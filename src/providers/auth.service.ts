import { Constants } from './../utils/Constants';
import { IGooglePlusResponse } from './../interfaces/IGooglePlusResponse';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

@Injectable()
export class AuthService {
    constructor(
        private _googlePlus: GooglePlus
    ) { }
    loginWithGooglePlus(): Promise<IGooglePlusResponse> {
        return this._googlePlus.login({
            scopes: 'profile email',
            offline: true,
            webClientId: Constants.firebaseOpts.WEB_CLIENT_ID
        }).then(res => {
            return firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
        }).catch(err => console.log("Auth Service error: " + err));
    }
    logoutWithGooglePlus(): Promise<any> {
        return this._googlePlus.logout();
    }
}