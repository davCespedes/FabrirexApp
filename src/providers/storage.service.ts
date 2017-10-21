import { Constants } from './../utils/Constants';
import { IUser } from './../interfaces/IUser';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {

    constructor(
        private _storage: Storage
    ) { }
    setCurrentUser(data: Object): void {
        this._storage.set(Constants.storage.CURRENT_USER, JSON.stringify(data));
    }

    getCurrentUser(): Promise<IUser> {
        return this._storage.get(Constants.storage.CURRENT_USER)
            .then(data => data ? JSON.parse(data) : undefined);
    }

    removeCurrentUser(): Promise<any> {
        return this._storage.remove(Constants.storage.CURRENT_USER);
    }


}