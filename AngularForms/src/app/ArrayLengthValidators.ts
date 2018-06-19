import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export class ArrayLengthValidators {
    static minArrayLength(minLength: number): ValidatorFn {

        let validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
            let r: ValidationErrors | null = null;

            if (control.value) {
                if (Array.isArray(control.value)) {
                    let actualLength = control.value.length;
                    if (actualLength < minLength) {
                        let message: string = `Minimalna ilość wpisów w %s to ${minLength}, bieżąca to ${actualLength}.`;
                        r = { "minArrayLength": message }
                    }
                }
            }

            return r;
        }

        return validator;
    }

    static maxArrayLength(maxLength: number): ValidatorFn {

        let validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
            let r: ValidationErrors | null = null;

            if (control.value) {
                if (Array.isArray(control.value)) {
                    let actualLength = control.value.length;
                    if (actualLength > maxLength) {
                        let message: string = `Maksymalna ilość wpisów w %s to ${maxLength}, bieżąca to ${actualLength}.`;
                        r = { "maxArrayLength": message }
                    }
                }
            }

            return r;
        }

        return validator;
    }
}