import { IProducts } from './../../../interfaces/IProducts';
import { Component } from "@angular/core";
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
    selector: 'product-detail-page',
    templateUrl: 'product-detail.html'
})
export class ProductDetailPage {


    product: IProducts;
    FILL: string = 'assets/images/fill.png';
    constructor(
        private _navParams: NavParams
    ) {
        this.product = this._navParams.get("product");
    }
    setBgImage() {
        return { 'background-image': `url(${this.product.image})` };
    }
    bgStyleFill() {
        return { 'background-image': `url(${this.FILL})` };
    }

}