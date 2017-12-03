import { HomePage } from './../home/home';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { IRequest } from './../../interfaces/IRequest';
import { IProducts } from './../../interfaces/IProducts';
import { ProductListPage } from './../product/product-list/product-list';
import { IdentityService } from './../../providers/identity.service';
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalController } from 'ionic-angular';
import { Constants } from '../../utils/Constants';
import { SqLiteService } from '../../providers/sqLite.service';
import { ToastrService } from '../../providers/toastr.service';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
    selector: 'request-page',
    templateUrl: 'request.html'
})
export class RequestPage {
    destiny: string = '';
    currentDate: String = new Date().toISOString();
    currentUser: any = {};
    selectedProducts: any[] = [];
    total: number = 0;
    constructor(
        private _formBuilder: FormBuilder,
        private _identitySrv: IdentityService,
        private _modalCtrl: ModalController,
        private _sqLiteSrv: SqLiteService,
        private _viewCtrl: ViewController,
        private _navCtrl: NavController,
        private _toastSrv: ToastrService
    ) { }

    ionViewWillEnter() {
        let user = this._identitySrv.user;
        this.currentUser.completeName = (user) ? user.firstName + " " + this._identitySrv.user.lastName : "Pepe Grillo";
    }
    goToProductList() {
        let modal = this._modalCtrl.create(ProductListPage);
        modal.present();
        modal.onDidDismiss(selectedProducts => {
            this.selectedProducts = (this.selectedProducts.length) ? this.selectedProducts.concat(selectedProducts) : selectedProducts;
            this.total = this._getTotal(this.selectedProducts);
        });
    }
    removeProduct(product: any) {
        let index = this.selectedProducts.indexOf(product);
        if (index > -1) {
            this.selectedProducts.splice(index, 1);
            this.total = this._getTotal(this.selectedProducts);
        }
    }
    private _getTotal(selectedProducts: any[]) {
        let total = 0;;
        selectedProducts.forEach(selectedProduct => {
            total = <number>total + <number>selectedProduct.subTotal;
        });
        return parseFloat("" + total);
    }
    saveRequest() {
        this._saveRequest()
            .then(request => {
                if (request) this._saveRequestDetail(request.rows.item(0));
                this._toastSrv.show("Solicitud Almacenada Correctamente");
                this._navCtrl.setRoot(HomePage).then(() => this.selectedProducts = []);
                // this._viewCtrl.dismiss();
            })
            .catch(err => console.log(err));
    }
    private _saveRequest(): Promise<any> {
        let databaseInstance;
        let entity = Constants.entities.SOLICITUDES;
        let newRequest = this._buildRequest();
        return this._sqLiteSrv.createDatabase()
            .then(db => {
                databaseInstance = db;
                return this._sqLiteSrv.createTable(databaseInstance, entity);
            })
            .then(table => {
                if (table) return this._sqLiteSrv.save(databaseInstance, newRequest, entity);
            })
            // .then(result => {
            //     return this._sqLiteSrv.getRequestByClientAndEmployee(databaseInstance, newRequest);
            // })
            .catch(err => console.log(err))
    }
    private _saveRequestDetail(request: IRequest) {
        let databaseInstance;
        let entity = Constants.entities.DETALLES_SOLICITUDES;
        return this._sqLiteSrv.createDatabase()
            .then(db => {
                databaseInstance = db;
                return this._sqLiteSrv.createTable(databaseInstance, entity);
            })
            .then(table => {
                if (table) {
                    this.selectedProducts.forEach(selectedProduct => {
                        let requestDetail = this._buildRequestDetail(request._id, selectedProduct.product._id, selectedProduct.quantity, selectedProduct.subTotal)
                        return this._sqLiteSrv.save(databaseInstance, requestDetail, entity);
                    });
                }
            })
            .catch(err => console.log(err));
    }
    private _buildRequest() {
        return {
            clientId: this._identitySrv.user._id,
            employeeId: this._identitySrv.user._id,
            destination: this.destiny,
            date: this.currentDate,
            total: this.total

        }
    }
    private _buildRequestDetail(requestId: string, productId: string, quantity: number, subTotal: number) {
        return {
            requestId: requestId,
            productId: productId,
            quantity: quantity,
            subTotal: subTotal
        }
    }
}