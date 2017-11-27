import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
@Injectable()
export class FirebaseService {
    users: FirebaseListObservable<any>;
    constructor(
        private _firebaseDB: AngularFireDatabase
    ) { }

    getCollectionByName(collectionName: string): FirebaseListObservable<any> {
        return this._firebaseDB.list(collectionName, { preserveSnapshot: true });
    }
}