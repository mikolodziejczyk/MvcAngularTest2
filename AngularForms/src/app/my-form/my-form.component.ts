import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { HttpClient } from '@angular/common/http';
import { FormMetadata, ControlsMetadata } from '../formMetadata';
import { markFormGroupTouched } from '../formhelpers/formHelpers';
import { FormSaveReply } from '../formSaveReply';
import { errorsToErrorObject } from '../formhelpers/errorsToErrorObject';
import { MyFormData } from './my-form-data';
import { FormMetadataService } from '../form-metadata.service';
import { MyFormSaveService } from './my-form-save.service';



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
      this.initialData = <MyFormData>JSON.parse('{"id":234,"locationId":1,"displayName":"Wpis próbny","unitPrice":321.12,"startYear":2001,"lastName":null,"notifyViaMail":true,"extraPerson":{"firstName":"John","lastName":"Doe"}}');
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

  formMetadata: FormMetadata;
  controlMetadata: ControlsMetadata;

  isSaving: boolean = false;
  isCancelling: boolean = false;
  isFailure: boolean = false;
  failureMessage: string;

  createForm() {
    this.myForm = this.fb.group({
      unitPrice: (this.initialData.unitPrice || null),
      startYear: [(this.initialData.startYear || null)],
      lastName: [(this.initialData.lastName || null)],
      notifyViaMail: [(this.initialData.notifyViaMail || false)],
      extraPerson: this.fb.group({
        firstName: (this.initialData.extraPerson.firstName || null),
        lastName: (this.initialData.extraPerson.lastName || null)
      })
    });


    this.unitPrice = <FormControl>this.myForm.controls["unitPrice"];
    this.startYear = <FormControl>this.myForm.controls["startYear"];
    this.lastName = <FormControl>this.myForm.controls["lastName"];
    this.notifyViaMail = <FormControl>this.myForm.controls["notifyViaMail"];
    this.extraPerson = <FormGroup>this.myForm.controls["extraPerson"];
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








}
