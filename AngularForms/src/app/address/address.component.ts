import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormGroupMetadata } from '../formMetadata';
import { AddressData } from './addressData';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  private _control: FormGroup;

  public get control(): FormGroup {
    return this._control;
  }

  @Input()
  public set control(value: FormGroup) {
    if (value && value != this._control) {
      this._control = value;
      this.createChildControls();
    }
  }

  private _initialData: AddressData;

  public get initialData(): AddressData {
    return this._initialData;
  }

  @Input()
  public set initialData(value: AddressData) {
    if (value && this._initialData != value) {
      this._initialData = value;
      this.setInitialData();
    }
  }

  @Input() controlMetadata: FormGroupMetadata;



  private createChildControls() {
    this._control.addControl("address1", new FormControl(""));
    this._control.addControl("address2", new FormControl(""));
    this._control.addControl("city", new FormControl(""));
    this._control.addControl("zip", new FormControl(""));
    this.setInitialData();
  }


  private setInitialData() {
    if (this._initialData && this._control) {
      this.control.patchValue(this._initialData);
    }
  }
}
