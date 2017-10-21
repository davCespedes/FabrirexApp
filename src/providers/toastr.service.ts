import { Toast } from '@ionic-native/toast';
import { Injectable } from "@angular/core";

import { ToastController } from "ionic-angular";
import { PlatformMonitorService } from './platform-monitor.service';

@Injectable()
export class ToastrService {

    constructor(
        private _toast: Toast,
        private _toastCtrl: ToastController,
        private _platformMtrSrv: PlatformMonitorService
    ) { }

    show(message: string, position: string = 'bottom', duration: any = '2000'): void {
        if (this._platformMtrSrv.isDevice()) {
            this._toast.show(message, duration, position)
                .subscribe(() => console.log(''));
        } else {
            duration = Number(duration);
            this._toastCtrl.create({ message, duration }).present();
        }
    }

}