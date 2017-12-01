import { ProductDetailPage } from './../../pages/product/product-detail/product-detail';
import { IProducts } from './../../interfaces/IProducts';
import { Input, Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'cs-product-list',
    templateUrl: 'cs-product-list.component.html'
})
export class CsProductListComponent {

    @Input() products: IProducts[] = [];

    constructor(
        private _navCtrl: NavController
    ) { }
    viewProduct(product: IProducts) {
        this._navCtrl.push(ProductDetailPage, { product });
    }
    bgStyle(image: string): any {
        return { 'background-image': `url(${image})` };
    }

}