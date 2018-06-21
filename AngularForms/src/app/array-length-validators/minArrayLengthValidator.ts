import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { FormattableError } from "../errorMessages/formattableError";

export interface ArrayMinLengthError extends FormattableError {
    minLength: number;
    actualLength: number;
}

export function minArrayLengthValidator(minLength: number, formatter?: arrayLengthMessageFormatter | null): ValidatorFn {

    let actualFormatter: formatErrorMessage = null;

    if (formatter) {
        actualFormatter = function (validationError: any, label: string): string {
            let arrayMinLengthError: ArrayMinLengthError = <ArrayMinLengthError>validationError;
            return formatter(label, arrayMinLengthError.minLength, arrayMinLengthError.actualLength);
        };
    }


    let validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        let r: ValidationErrors | null = null;

        if (control.value) {
            if (Array.isArray(control.value)) {
                let actualLength = control.value.length;
                if (actualLength < minLength) {
                    // there's a validation error, two kinds of retuned value
                    let errorObject: ArrayMinLengthError | string = null;

                    if (actualFormatter) {
                        errorObject = {
                            actualLength : actualLength,
                            minLength : minLength,
                            formatErrorMessage : actualFormatter
                        };
                    }
                    else {
                        errorObject = `W %s musisz wprowadzić co najmniej ${minLength} pozycji.`;
                    }


                    r = { "minArrayLength": errorObject }
                }
            }
        }

        return r;
    }

    return validator;
}