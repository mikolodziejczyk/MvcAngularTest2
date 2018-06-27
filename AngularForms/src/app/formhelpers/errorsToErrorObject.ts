import { ValidationErrors } from "@angular/forms";

/**
 * Transforms a single error message or an array of anonymous error messages into a ValidationErrors object.
 * @param errors A string or array of strings - error messages.
 */
export function errorsToErrorObject(errors: string | string[]): ValidationErrors {
    let r = null;

    if (errors !== null && errors !== undefined) {

        let errorArray: string[] = [];

        if (typeof (errors) == "string") {
            errorArray = [errors];
        }
        else if (Array.isArray(errors)) {
            errorArray = <string[]>errors;
        }
        else throw new Error("Error type not supported.");

        if (errorArray.length > 0) {
            r = {};
            let counter: number = 0;

            for (let error of errorArray) {
                let member = "anonymousError_" + counter.toString();
                counter++;
                r[member] = error;
            }

            
        }

        return r;
    }
}