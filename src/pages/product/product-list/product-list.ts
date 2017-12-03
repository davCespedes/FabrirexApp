import { SqLiteService } from './../../../providers/sqLite.service';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Constants } from '../../../utils/Constants';
import { IProducts } from '../../../interfaces/IProducts';
@Component({
    selector: 'product-list-page',
    templateUrl: 'product-list.html'
})
export class ProductListPage {
    products: IProducts[];
    request: boolean = true;
    constructor(
        private _viewCtrl: ViewController,
        private _sqLiteSrv: SqLiteService
    ) {
        this._getProducts();
    }
    close() {
        this._viewCtrl.dismiss();
    }
    setProducts(selectedProducts: any[]) {
        this._viewCtrl.dismiss(selectedProducts);
    }
    private _getProducts() {
        let entity = Constants.entities.PRODUCTOS;
        this._sqLiteSrv.createDatabase()
            .then(db => this._sqLiteSrv.getDataByEntity(db, entity))
            .then(productList => {
                let tempList = [];
                for (let i = 0; i < productList.rows.length; i++) {
                    tempList.push(productList.rows.item(i));
                }
                this.products = tempList;
            })
    }
}