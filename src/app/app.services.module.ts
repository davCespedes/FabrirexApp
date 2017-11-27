import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { Constants } from './../utils/Constants';
import { GooglePlus } from '@ionic-native/google-plus';

import { PlatformMonitorService } from './../providers/platform-monitor.service';
import { AuthService } from './../providers/auth.service';
import { StorageService } from './../providers/storage.service';
import { ToastrService } from './../providers/toastr.service';
import { IdentityService } from './../providers/identity.service';
import { SqLiteService } from './../providers/sqLite.service';
import { FirebaseService } from './../providers/firebase.service';
import { AccountValidatorService } from '../providers/account-validator.service';

import firebase from 'firebase';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SQLite } from '@ionic-native/sqlite';

firebase.initializeApp(Constants.firebaseConfig());
@NgModule({
    providers: [
        ToastrService,
        PlatformMonitorService,
        AuthService,
        StorageService,
        IdentityService,
        GooglePlus,
        FirebaseService,
        AngularFireDatabase,
        SqLiteService,
        AccountValidatorService,
        SQLite
    ],
    imports: [
        AngularFireModule.initializeApp(Constants.firebaseConfig()),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ]
})
export class AppServicesModule { }