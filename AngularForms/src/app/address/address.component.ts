import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupMetadata } from '../formMetadata';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() control : FormGroup;
  
  @Input() controlMetadata: FormGroupMetadata;
  

}
