import { Injectable } from '@angular/core';

import { ViewSettings } from './viewSettings';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ViewService {

  constructor(private http: HttpClient) { }

  setTemporaryView(req : ViewSettings) : Promise<void> {
    return this.http.post<void>("/api/ViewManager/SetTemporaryView", req).toPromise();
  }
  
  getCurrent(listId : number) : Promise<ViewSettings> {
    let url = `/api/ViewManager/GetCurrent?listId=${listId}`;
    return this.http.get<ViewSettings>(url).toPromise();
  }
}
