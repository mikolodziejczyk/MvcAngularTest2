import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { HttpClient } from '@angular/common/http';
import { FormMetadata, ControlsMetadata, FormArrayMetadata } from '../formMetadata';
import { markFormGroupTouched } from '../formhelpers/formHelpers';
import { FormSaveReply } from '../formSaveReply';
import { errorsToErrorObject } from '../formhelpers/errorsToErrorObject';
import { MyFormData } from './my-form-data';
import { FormMetadataService } from '../form-metadata.service';
import { MyFormSaveService } from './my-form-save.service';
import { ArrayLengthValidators } from '../ArrayLengthValidators';



@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private metadataService: FormMetadataService, private saveService: MyFormSaveService) {
    this.getInitialData();
    this.isNew = !this.initialData.id;
    this.loadMetadata();

  }

  ngOnInit() {


  }

  getInitialData(): void {
    let dataElement = (<HTMLInputElement>document.getElementById("initialData"));
    if (dataElement) {
      this.initialData = JSON.parse(dataElement.value);
    }
    else {
      this.initialData = <MyFormData>JSON.parse('{"id":234,"locationId":1,"displayName":"Wpis próbny","unitPrice":321.12,"startYear":2001,"lastName":null,"notifyViaMail":true,"extraPerson":{"firstName":"John","lastName":"Doe"},"recipients":["tom@gmail.com","john@somewhere.com","harry@nowhere.com"],"contacts":[{"firstName":"Jan","lastName":"Kowalski"},{"firstName":"Tomasz","lastName":"Nowak"}]}');
    }
  }

  async loadMetadata() {
    let formMetadataUrl = "/api/home/FormMetadata"; // fallback value
    let dataElement = (<HTMLInputElement>document.getElementById("formMetadataUrl"));
    if (dataElement) {
      formMetadataUrl = dataElement.value;
    }

    console.log(`Form metadata url: ${formMetadataUrl}`);
    this.formMetadata = await this.metadataService.getMetadata(formMetadataUrl);
    this.controlMetadata = this.formMetadata.controls;
    this.createForm();
  }


  initialData: MyFormData;
  isNew: boolean;

  myForm: FormGroup;
  unitPrice: FormControl;
  startYear: FormControl;
  lastName: FormControl;
  notifyViaMail: FormControl;
  extraPerson: FormGroup;
  recipients: FormArray;
  contacts: FormArray;

  formMetadata: FormMetadata;
  controlMetadata: ControlsMetadata;

  isSaving: boolean = false;
  isCancelling: boolean = false;
  isFailure: boolean = false;
  failureMessage: string;

  createForm() {
    let recipientsMetadata : FormArrayMetadata = <FormArrayMetadata>this.controlMetadata["recipients"];
    let contactsMetadata : FormArrayMetadata = <FormArrayMetadata>this.controlMetadata["contacts"];

    this.myForm = this.fb.group({
      unitPrice: (this.initialData.unitPrice || null),
      startYear: [(this.initialData.startYear || null)],
      lastName: [(this.initialData.lastName || null)],
      notifyViaMail: [(this.initialData.notifyViaMail || false)],
      extraPerson: this.fb.group({
        firstName: (this.initialData.extraPerson.firstName || null),
        lastName: (this.initialData.extraPerson.lastName || null)
      }),
      recipients: this.fb.array([],
         Validators.compose([ArrayLengthValidators.minArrayLength(recipientsMetadata.minLength), ArrayLengthValidators.maxArrayLength(recipientsMetadata.maxLength)])),
      contacts: this.fb.array([], 
        Validators.compose([ArrayLengthValidators.minArrayLength(contactsMetadata.minLength), ArrayLengthValidators.maxArrayLength(contactsMetadata.maxLength)]))
    });


    this.unitPrice = <FormControl>this.myForm.controls["unitPrice"];
    this.startYear = <FormControl>this.myForm.controls["startYear"];
    this.lastName = <FormControl>this.myForm.controls["lastName"];
    this.notifyViaMail = <FormControl>this.myForm.controls["notifyViaMail"];
    this.extraPerson = <FormGroup>this.myForm.controls["extraPerson"];
    this.recipients = <FormArray>this.myForm.controls["recipients"];
    this.contacts = <FormArray>this.myForm.controls["contacts"];

    for (let mail of this.initialData.recipients) {
      this.addRecipient(mail, true);
    }

    for (let contact of this.initialData.contacts) {
      this.addContact(contact.firstName, contact.lastName, true);
    }
  }


  ngOnDestroy(): void {

  }

  onSubmit = async () => {
    console.log(`onSubmit() called.`);
    markFormGroupTouched(this.myForm);
    this.myForm.updateValueAndValidity();



    if (!this.myForm.valid) {
      console.log(`Form invalid, submit cancelled.`);
      return;
    }

    this.isSaving = true;

    // convert form value into the format suitable for submitting, here no changes are neccessary.
    let formData: MyFormData = this.myForm.value;
    formData.id = this.initialData.id;
    formData.locationId = this.initialData.locationId;

    let r: FormSaveReply = await this.saveService.save(this.formMetadata.saveUrl, this.myForm.value);
    this.isSaving = false;


    if (r.isSuccess) {
      window.location.href = this.formMetadata.okUrl;
    } else if (r.isError) {

      let errors: ValidationErrors = errorsToErrorObject(r.errors);
      this.myForm.setErrors(errors);
    } else if (r.isFailure) {
      this.isFailure = true;
      this.failureMessage = r.failureMessage || "Nie udało sie zapisać zmian. Spróbuj ponownie.";
    }



  }

  onCancel = () => {
    this.isCancelling = true;
    window.location.href = this.formMetadata.cancelUrl;
  }

  addRecipient = (mail: string, isControlSetup?: boolean): void => {
    let c: FormControl = new FormControl(mail);
    this.recipients.push(c);
    if (!isControlSetup) { this.recipients.markAsDirty(); this.recipients.markAsTouched(); }
  }

  removeRecipient(i: number, isControlSetup?: boolean) {
    this.recipients.removeAt(i);
    this.recipients.markAsDirty(); this.recipients.markAsTouched();
  }

  addContact = (firstName: string, lastName: string, isControlSetup?: boolean) => {
    let g = this.fb.group({
      firstName: [firstName],
      lastName: [lastName]
    });
    this.contacts.push(g);
    if (!isControlSetup) { this.contacts.markAsDirty(); this.contacts.markAsTouched(); }
  }

  removeContact = (i: number) => {
    this.contacts.removeAt(i);
    this.contacts.markAsDirty(); this.contacts.markAsTouched();
  }

}


