import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormGroupMetadata } from '../formMetadata';
import { AddressData } from './addressData';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    this.control = fb.group({
      address1: "",
      address2: "",
      city: "",
      zip: ""
    });

    console.log("--------------------- AddressComponent is instantiated ---------------------");
  }

  ngOnInit() {
  }

  control: FormGroup;

  private _initialData: AddressData;

  public get initialData(): AddressData {
    return this._initialData;
  }

  @Input()
  public set initialData(value: AddressData) {
    this._initialData = value;

    this.control.patchValue(value);
  }



  @Input() controlMetadata: FormGroupMetadata;


}
