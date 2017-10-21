import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { Constants } from './../utils/Constants';
import { GooglePlus } from '@ionic-native/google-plus';

import { PlatformMonitorService } from './../providers/platform-monitor.service';
import { AuthService } from './../providers/auth.service';
import { StorageService } from './../providers/storage.service';
import { ToastrService } from './../providers/toastr.service';
import { IdentityService } from './../providers/identity.service';
import firebase from 'firebase';

firebase.initializeApp(Constants.firebaseConfig());
@NgModule({
    providers: [
        ToastrService,
        PlatformMonitorService,
        AuthService,
        StorageService,
        IdentityService,
        GooglePlus
    ],
    imports: [
        AngularFireModule.initializeApp(Constants.firebaseConfig())
    ]
})
export class AppServicesModule { }