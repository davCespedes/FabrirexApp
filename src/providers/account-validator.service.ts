import { FormControl, FormGroup, AbstractControl } from '@angular/forms';

export class AccountValidatorService {
    static matchPassword(passwordKey: string, confirmKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey];
            let confirmInput = group.controls[confirmKey];

            if (passwordInput.value !== confirmInput.value) {
                return { areNotEqual: true };
            }

            return null;
        };
    }
}