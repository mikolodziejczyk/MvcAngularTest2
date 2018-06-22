import { Injectable } from '@angular/core';
import { MyFormData } from './my-form-data';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoadDataService {

  constructor(private http: HttpClient) { }

  loadData(url: string): Promise<MyFormData> {
    let r: Promise<MyFormData>;

    // Phase 1 - try to get the data from an input element embedded in the page
    let dataElement = (<HTMLInputElement>document.getElementById("initialData"));
    if (dataElement) {
      let data = <MyFormData>JSON.parse(dataElement.value);
      r = Promise.resolve(data);
      console.log(`Initial data retrieved from the embedded data`);
    }
    else {
      // Phase 2 - determine the url to fetch data from or use one passed to the instance
      let urlElement = (<HTMLInputElement>document.getElementById("initialDataUrl"));
      if (urlElement) {
        url = urlElement.value;
      }

      r = this.http.get<MyFormData>(url).toPromise();
      console.log(`Initial data retrieved from: ${url}`);
    }

    return r;
  }

}
