import { Constants } from './../utils/Constants';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthService } from './../providers/auth.service';
import { NgModule } from '@angular/core';

import { PlatformMonitorService } from './../providers/platform-monitor.service';
import { ToastrService } from './../providers/toastr.service';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';
// export const firebaseConfig = {
//     apiKey: "AIzaSyCrydR88tj4E8CkGTGlAqtcPdFrpZvX8Zg",
//     authDomain: "fabrirex-204f3.firebaseapp.com",
//     databaseURL: "https://fabrirex-204f3.firebaseio.com",
//     projectId: "fabrirex-204f3",
//     storageBucket: "fabrirex-204f3.appspot.com",
//     messagingSenderId: "852493913575"
// };
firebase.initializeApp(Constants.firebaseConfig());
@NgModule({
    providers: [
        ToastrService,
        PlatformMonitorService,
        AuthService,
        GooglePlus
    ],
    imports: [
        AngularFireModule.initializeApp(Constants.firebaseConfig())
    ]
})
export class AppServicesModule { }