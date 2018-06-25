import { Component, OnInit, Input, ContentChild, forwardRef, OnDestroy } from '@angular/core';
import { TextInputControlBaseMetadata } from '../textInputControlBase/textInputControlBaseMetadata';
import { GeneralControlMetadata } from '../generalControl/generalControlMetadata';
import { uniqueControlIdGenerator } from '../uniqueControlIdGenerator';
import { FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InternalControlErrors } from '../internalControlErrors';

@Component({
  selector: 'mko-text-control-base',
  templateUrl: './text-control-base.component.html',
  styleUrls: ['./text-control-base.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextControlBaseComponent),
      multi: true
    }
  ]
})
export class TextControlBaseComponent implements OnInit, OnDestroy {

  static readonly controlSizeSmall = "-mko-control-size-small";
  static readonly controlSizeMedium = "-mko-control-size-medium";
  static readonly controlSizeLarge = "-mko-control-size-large";

  constructor() {
    this.name = "";
    this.id = "";
    this.placeholder = "";
   }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

  @Input() useDefaultTemplate: boolean = true;

  valueAsString: any;
  disabled: boolean;

  // #region ControlValueAccessor


  /**
   * ControlValueAccessor.writeValue() implementation, calls updateValueAndState()
   * @param obj - the new control value in any form supported by the control.
   */
  writeValue(obj: any): void {
    this.valueAsString = this.valueToString(obj);

    window.setTimeout(() => {
      this.updateControl(this.valueAsString, false);
    }, 0);

  }

  /**
   * A part of ControlValueAccessor implementation, keeps the method passed by registerOnChange
   */
  propagateChange = (_: any) => { };


  /**
   * ControlValueAccessor.registerOnChange implementation
   * @param fn 
   */
  registerOnChange(fn: any): void {

    this.propagateChange = fn;
  }

  /**
  * A part of ControlValueAccessor implementation, keeps the method passed by registerOnTouched
  */
  onTouched = () => { };

  /**
   * ControlValueAccessor.registerOnTouched() implementation
   * @param fn 
   */
  registerOnTouched(fn: any): void {

    this.onTouched = fn;
  }

  /**
   * ControlValueAccessor.setDisabledState() implementation
   * @param isDisabled 
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  // #endregion ControlValueAccessor

  // #region event handers

  /**
   * Reacts to both change and input events
   */
  onInput = (event : Event) => {
    let rawValue: string = (<HTMLInputElement>(event.target)).value;
    this.updateControl(rawValue, true);
  }

  onBlur = () => {
    this.onTouched();
  }

  // #endregion event handlers

  // #region GeneralControl interface

  protected _control: FormControl;

  /**
   * Reference to FormControl, needs to be injected into this control or provided via the FormControl directive.
  */
  @Input() public set control(value: FormControl) {
    this._control = value;
    this.internalControlErrors.control = value;
  }

  public get control(): FormControl {
    return this._control;
  }



  /**
   * The label displayed for this control.
   */
  @Input() label: string;

  /**
   * The input.id in this control
   */
  @Input() id: string;


  protected _isRequired: boolean = false;

  @Input() set isRequired(v: boolean) {
    if (this._isRequired != v) {
      this._isRequired = v;
      this.updateInternalValidators();
    }
  }
  get isRequired(): boolean {
    return this._isRequired;
  }

  @Input() help: string;


  /**
   * The input.name in this control
   */
  @Input() name: string;

  protected _metadata: TextInputControlBaseMetadata;

  @Input() set metadata(v: GeneralControlMetadata) {
    if (!v) return;
    this.setMetadata(v);

  }
  get metadata(): GeneralControlMetadata {
    return this._metadata;
  }

  /**
   * Internal metadata set method. Allows overriding in the derived classes.
   */
  protected setMetadata(v: GeneralControlMetadata): void {
    let hasMetatadaChanged: boolean = this._metadata != v;

    if (hasMetatadaChanged) {
    this._metadata = <TextInputControlBaseMetadata>v;

    this.label = this._metadata.label;
    this.isRequired = this._metadata.isRequired || false;
    if (this._metadata.id) this.id = this._metadata.id; else this.id = uniqueControlIdGenerator.getId();
    if (this._metadata.name !== undefined) this.name = this._metadata.name;
    this.help = this._metadata.help || null;
    if (this._metadata.placeholder !== undefined) this.placeholder = this._metadata.placeholder;
    if (this._metadata.maxLength !== undefined) this.maxLength = this._metadata.maxLength;
    if (this._metadata.controlSize !== undefined) this.controlSize = this._metadata.controlSize;
    }
  }

  // #endregion GeneralControl interface

  // #region public interface

  /**
   * The input.placeholder in this control
   */
  @Input() placeholder : string;


  /**
   * The input.maxLength in this control
   */
  @Input()  maxLength: number;

  _controlSize: "small" | "medium" | "large" | null;

  @Input() set controlSize(v: "small" | "medium" | "large" | null) {
    this._controlSize = v;
    this.isControlSizeSmall = v == "small";
    this.isControlSizeMedium = v == "medium";
    this.isControlSizeLarge = v == "large";
  }

  get controlSize(): "small" | "medium" | "large" {
    return this._controlSize;
  }

  isControlSizeSmall : boolean = false;
  isControlSizeMedium : boolean = false;
  isControlSizeLarge : boolean = false;


  // #endregion public interface




  // #region control state

  /**
   * Keeps information whether the control is empty.
   */
  protected isEmpty: boolean;

  // #endregion control state

  /**
   * On the basis of the control state determined by updateValueAndState() adds control errors.
   * Runs validators integrated with this control. Internal validators aren't Angular validators, they are just code adding / removing control errors.
   * The default implementation covers required only.
   * In the derived classes you add more validators.
   */
  updateInternalValidators() {
    if (this.isEmpty && this.isRequired) {
      this.internalControlErrors.setControlError("required", true);
    }
    else {
      this.internalControlErrors.removeControlError("required");
    }


  }

  internalControlErrors: InternalControlErrors = new InternalControlErrors();


  /**
  * Updates the value of the control from a raw or cooked value, returns the new value.
  * The default implementation tests only for isEmpty.
  * In the derived class you add the value check.
  * @param rawValue 
  */

  updateValueAndState(rawValue: any | null | undefined): any {
    this.isEmpty = rawValue === null || rawValue === undefined || rawValue == "";

    return rawValue;
  }


  /**
   * Updates this control with a new value, then determines its new state and runs internal validators.
   * This method usually doesn't need to be overriden.
   * @param rawValue 
   * @param emitChange 
   */
  updateControl(rawValue: any | null | undefined, emitChange: boolean = false) {
    let cookedValue: any = this.updateValueAndState(rawValue);

    if (emitChange) {
      this.propagateChange(cookedValue);
    }

    this.updateInternalValidators();
  }

  /**
   * Provides generic transformation from cooked value (e.g. number) into a string.
   * Should be overriden in derived classes as needed.
   * @param value - The cooked value for the control
   */
  protected valueToString(value: any): string {
    return value ? value.toString() : "";
  }

  // #region retrieving bound FormControl from a directive

  @ContentChild(FormControlDirective) formControlDirective: FormControlDirective;

  ngAfterViewInit(): void {
    if (this.formControlDirective && this.formControlDirective.control) {
      this.control = this.formControlDirective.control;
    }
  }

  // #endregion 

}
