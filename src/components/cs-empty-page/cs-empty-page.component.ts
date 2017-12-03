import { Component, Input } from '@angular/core';

@Component({
    selector: 'cs-empty-page',
    templateUrl: 'cs-empty-page.component.html'
})
export class CsEmptyPageComponent {
    @Input() entity: string;
    @Input() entityImage: string;
    @Input() baseMessage: string = "No haz realizado ninguna ";
    message: string;
    EMPTY: string = "assets/images/empty.png";
    ngOnChanges() {
        this.message = this.baseMessage + `${this.entity}` + '.';
    }
    constructor() {
        this.entityImage = this.entityImage ? this.entityImage : this.EMPTY;
    }
}