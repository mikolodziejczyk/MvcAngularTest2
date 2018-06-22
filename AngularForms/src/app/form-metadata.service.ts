import { Injectable } from '@angular/core';

import { FormMetadata } from './formMetadata';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FormMetadataService {

  constructor(private http: HttpClient) { }

  /**
   * Retrieves the form metadata from the location embedded in the current page or, if not present, using the passed url.
   * @param url 
   */
  async getMetadata(url: string): Promise<FormMetadata> {

    let dataElement = (<HTMLInputElement>document.getElementById("formMetadataUrl"));
    if (dataElement) {
      url = dataElement.value;
    }

    console.log(`Form metadata url: ${url}`);


    let r: Promise<FormMetadata> = this.http.get<FormMetadata>(url).toPromise();

    return r;
  }
}


