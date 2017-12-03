import { ToastrService } from './../../providers/toastr.service';
import { ProductDetailPage } from './../../pages/product/product-detail/product-detail';
import { IProducts } from './../../interfaces/IProducts';
import { Output, Input, Component, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
    selector: 'cs-product-list',
    templateUrl: 'cs-product-list.component.html'
})
export class CsProductListComponent {
    success: boolean;

    @Input() products: IProducts[] = [];
    @Input() request: boolean = false;
    @Output() selectedProducts: any[] = [];
    @Output() productsEmitter = new EventEmitter<any[]>();

    constructor(
        private _navCtrl: NavController,
        private _alertCtrl: AlertController,
        private _toastSrv: ToastrService,
        private _viewCtrl: ViewController
    ) { }
    viewProduct(product: IProducts) {
        this._navCtrl.push(ProductDetailPage, { product });
    }
    bgStyle(image: string): any {
        return { 'background-image': `url(${image})` };
    }
    addProduct(product: IProducts) {
        this._buildQuantityAlert(product);
    }
    private _buildQuantityAlert(product: IProducts) {
        let alert = this._alertCtrl.create({
            title: 'Ingresar Cantidad:',
            inputs: [
                {
                    name: 'quantity',
                    placeholder: 'Ingrese la cantidad'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        this.success = false;
                    }
                },
                {
                    text: 'Aceptar',
                    handler: data => {
                        this.success = true;
                        if (data.quantity <= product.stock) {
                            let subTotal = <number>data.quantity + <number>product.price;
                            let detail = { product, quantity: data.quantity, subTotal };
                            this.selectedProducts.push(detail);
                            this._buildConfirmAlert();
                            this._toastSrv.show("El producto ha sido Agregado")
                        } else this._toastSrv.show("Stock Insuficiente")
                    }
                }
            ]
        });
        alert.present();
    }
    private _buildConfirmAlert() {
        let alert = this._alertCtrl.create({
            title: 'Confirmación',
            message: '¿Desea seleccionar otro producto?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        this.productsEmitter.emit(this.selectedProducts);
                    }
                },
                {
                    text: 'Si',
                    handler: () => { }
                }
            ]
        });
        alert.present();
    }
}