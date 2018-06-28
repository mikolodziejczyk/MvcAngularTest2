import { Injectable } from '@angular/core';
import { Connection } from './connection';
import { HttpClient } from '@angular/common/http';
import { DataPage } from './dataPage';
import { LazyLoadEvent } from 'primeng/api';


@Injectable()
export class ConnectionListService {

  constructor(private http: HttpClient) { }

  getConnections() : Promise<Connection[]> {
    return this.http.get<Connection[]>("/api/Ep/index").toPromise();
  }

  getConnectionPage(req : LazyLoadEvent) : Promise<DataPage> {
    return this.http.post<DataPage>("/api/Ep/page", req).toPromise();
  }
}
