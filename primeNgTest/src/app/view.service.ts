import { Injectable } from '@angular/core';

import { ViewSettings } from './viewSettings';
import { HttpClient } from '@angular/common/http';
import { ViewListEntry } from './viewListEntry';

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

  saveNewNamedView(req : ViewSettings) : Promise<ViewSettings> {
    return this.http.post<ViewSettings>("/api/ViewManager/SaveNewNamedView", req).toPromise();
  }

  getViewList(listId : number) : Promise<ViewListEntry[]> {
    let url = `/api/ViewManager/GetViewList?listId=${listId}`;
    return this.http.get<ViewListEntry[]>(url).toPromise();
  }

  GetViewById(id : number) : Promise<ViewSettings> {
    let url = `/api/ViewManager/GetViewById/${id}`;
    return this.http.get<ViewSettings>(url).toPromise();
  }
}
