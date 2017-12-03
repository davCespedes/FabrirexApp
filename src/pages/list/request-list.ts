import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../utils/Constants';
import { SqLiteService } from '../../providers/sqLite.service';

@Component({
  selector: 'request-list',
  templateUrl: 'request-list.html'
})
export class RequestListPage {
  requestList: any[] = [];
  entity: string = "solicitud";
  constructor(
    private _sqLiteSrv: SqLiteService
  ) {
    this._getRequestList();
  }
  private _getRequestList() {
    let entity = Constants.entities.SOLICITUDES;
    this._sqLiteSrv.createDatabase()
      .then(db => this._sqLiteSrv.getDataByEntity(db, entity))
      .then(requestList => {
        let tempList = [];
        for (let i = 0; i < requestList.rows.length; i++) {
          tempList.push(requestList.rows.item(i));
        }
        this.requestList = tempList;
      })
  }

}
