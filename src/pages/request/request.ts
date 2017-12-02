import { Component } from "@angular/core/src/metadata/directives";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'request-page',
    templateUrl: 'request.html'
})
export class RequestPage {
    event: any;
    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.event = {
            month: '1990-02-19',
            timeStarts: '07:43',
            timeEnds: '1990-02-20'
        };
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

}