import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { FormattableError } from "../errorMessages/formattableError";

export interface ArrayMaxLengthError extends FormattableError {
    maxLength: number;
    actualLength: number;
}

export function maxArrayLengthValidator(maxLength: number, formatter?: arrayLengthMessageFormatter | null): ValidatorFn {

    let actualFormatter: formatErrorMessage = null;

    if (formatter) {
        actualFormatter = function (validationError: any, label: string): string {
            let arrayMaxLengthError: ArrayMaxLengthError = <ArrayMaxLengthError>validationError;
            return formatter(label, arrayMaxLengthError.maxLength, arrayMaxLengthError.actualLength);
        };
    }


    let validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        let r: ValidationErrors | null = null;

        if (control.value) {
            if (Array.isArray(control.value)) {
                let actualLength = control.value.length;
                if (actualLength > maxLength) {
                    // there's a validation error, two kinds of retuned value
                    let errorObject: ArrayMaxLengthError | string = null;

                    if (actualFormatter) {
                        errorObject = {
                            actualLength : actualLength,
                            maxLength : maxLength,
                            formatErrorMessage : actualFormatter
                        };
                    }
                    else {
                        errorObject = `W %s możesz wprowadzić co najwyżej ${maxLength} pozycji.`;
                    }


                    r = { "maxArrayLength": errorObject }
                }
            }
        }

        return r;
    }

    return validator;
}