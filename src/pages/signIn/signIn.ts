import { IdentityService } from './../../providers/identity.service';
import { ToastrService } from './../../providers/toastr.service';
import { NavController } from 'ionic-angular';
import { SqLiteService } from './../../providers/sqLite.service';
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AccountValidatorService } from "../../providers/account-validator.service";
import { Constants } from '../../utils/Constants';
import { HomePage } from '../home/home';

@Component({
    selector: 'signin-page',
    templateUrl: 'signIn.html'
})
export class SignInPage {
    newUserForm: FormGroup;
    constructor(
        private _formBuilder: FormBuilder,
        private _sqLiteSrv: SqLiteService,
        private _navCtrl: NavController,
        private _toastrSrv: ToastrService,
        private _identitySrv: IdentityService
    ) {
        this.newUserForm = this._buildForm();
    }
    signIn() {
        this._saveUser()
            .then(user => {
                if (user) {
                    let currentUser = this._buildCurrentUser(user.rows.item(0));
                    this._identitySrv.user = currentUser;
                    this._navCtrl.setRoot(HomePage);
                    this._toastrSrv.show("Registro Satisfactorio");
                }
            })
            .catch(error => {
                this._toastrSrv.show("Error durante el proceso de Registro");
            })
    }
    private _buildForm() {
        let form = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            userType: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        });
        return form;
    }
    private _saveUser(): Promise<any> {
        let databaseInstance;
        let entity = Constants.entities.USUARIOS;
        let newUserFormData = this.newUserForm.value;
        return this._sqLiteSrv.createDatabase()
            .then(db => {
                databaseInstance = db;
                return this._sqLiteSrv.createTable(databaseInstance, entity);
            })
            .then(table => {
                if (table) return this._sqLiteSrv.save(databaseInstance, newUserFormData, entity);
            })
            .then(success => {
                if (success) return this._sqLiteSrv.getSessionUserData(databaseInstance, newUserFormData);
            })
            .catch(error => console.log(error));
    }
    private _buildCurrentUser(user: any) {
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            username: user.username
        }
    }
}