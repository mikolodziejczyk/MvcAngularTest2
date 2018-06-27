/**
 * Describes a server response when saving a form.
 */
export interface FormSaveReply {
    /**
     * Indicates that the operation has been successful (changes applied)
     */
    isSuccess?: boolean;

    /**
     * Indicates that is a recoverable error, i.e. the server has returned some errors. The form should remain open and allow resubmitting.
     */
    isError?: boolean;

    /**
     * Indicates that the operation has failed in a non-recoverable way; there no errors to correct but there can be a failure message.
     */
    isFailure?: boolean;


    /**
     * Where to go after a success / a failure. It's up to the form implementation whether to use this field.
     */
    redirectUrl?: string;


    /**
     * When the server retuns a (recoverable) error, this keeps form-level error messages as a string. They need to be transformed into a validation errors by the form.
     */
    errors?: string[];

    /**
     * Optional reason for the failure if the result is an unrecoverable failure.
     */
    failureMessage?: string;

    /**
     * Server-side property-level errors. 
     * The key is an string with the path to the control, e.g. "contacts.0.lastName". The value is a string or an array of strings.
     * The errors message can contain the %s placeholder, which will be replaced by the control label when displaying the error.
     */
    propertyErrors?: { [key: string]: any };
}
