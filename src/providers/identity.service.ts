import { StorageService } from './storage.service';
import { IUser } from './../interfaces/IUser';
import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class IdentityService {

    private _user: IUser;

    subscriber: EventEmitter<IUser>;

    constructor(
        private _storageSrv: StorageService
    ) {
        this.subscriber = new EventEmitter<IUser>();
    }

    set user(user: IUser) {
        if (user) this._storageSrv.setCurrentUser(user);
        else this._storageSrv.removeCurrentUser();

        this._user = user;
        this.subscriber.next(user);
    }

    get user(): IUser {
        return this._user;
    }
    getCurrentUser(): Promise<IUser> {
        return this._storageSrv.getCurrentUser()
            .then(user => user)
            .then(user => {
                this.user = user;
                return user;
            });
    }
}