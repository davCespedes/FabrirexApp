import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class PlatformMonitorService {

    constructor(
        private _platform: Platform
    ) { }

    ready(): Promise<any> {
        return this._platform.ready();
    }

    isDevice() {
        return this._platform.is('cordova');
    }

    isMovil() {
        return this._platform.is('mobile');
    }

    isTablet() {
        return this._platform.is('tablet');
    }

    isAndroid() {
        return this._platform.is('android');
    }

    isIOS() {
        return this._platform.is('ios');
    }

    registerBackButton(cbBackButtonAction: any, priority: number = 0) {
        this._platform.registerBackButtonAction(cbBackButtonAction, priority);
    }

    exitApp() {
        this._platform.exitApp();
    }

}