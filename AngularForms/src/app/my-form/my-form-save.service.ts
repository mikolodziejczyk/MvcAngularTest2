import { Injectable } from '@angular/core';
import { FormSaveReply } from '../formSaveReply';
import { MyFormData } from './my-form-data';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MyFormSaveService {

  constructor(private http: HttpClient) { }

  async save(url: string, data: MyFormData): Promise<FormSaveReply> {

    let r: FormSaveReply;

    try {
      let o = this.http.post<FormSaveReply>(url, data);
      r = await o.toPromise();
    }
    catch (e) {
      r = { isFailure: true };
    }
    return r;
  }

}
