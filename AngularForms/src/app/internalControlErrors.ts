import { ValidationErrors, FormControl } from "@angular/forms";
import { setControlError, removeControlError } from "./validationErrorHelpers"

/**
 * Manages validation errors from internal validators, keeps them is no control is set yet, flushes them and keeps in sync when the control is bound.
 * This allows to bind a control instance at a later point in a component lifecycle while still keeping all internal validation errors.
 */
export class InternalControlErrors {

    /**
     * Local store of validation errors
     */
    errors: ValidationErrors = {};

    /**
     * The connected control. As long as unset, the errors are stored locally.
     */
    _control: FormControl;


    set control(v: FormControl) {
        let hasChanged: boolean = v !== this._control;
        this._control = v;
        this.syncErrors;
    }

    get control(): FormControl {
        return this._control;
    }


    /**
     * Synchronizes locally stored errors, that is sets all control errors that have been stored.
     */
    syncErrors() {
        Object.entries(this.errors).forEach(
            (value: [string, any]) => { 
                setControlError(this._control, value[0], value[1]); 
            });
    }


    setControlError(errorKey: string, errorValue: any) {
        if (!this.errors[errorKey]) {
            this.errors[errorKey] = errorValue;
        }

        if (this._control) {
            setControlError(this._control, errorKey, errorValue);
        }
    }

    removeControlError(errorKey: string) {
        if (this.errors[errorKey]) {
            delete this.errors[errorKey];
        }


        if (this._control) {
            removeControlError(this._control, errorKey);
        }
    }
}