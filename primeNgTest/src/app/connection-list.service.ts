import { Injectable } from '@angular/core';
import { Connection } from './connection';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ConnectionListService {

  constructor(private http: HttpClient) { }

  getConnections() : Promise<Connection[]> {
    return this.http.get<Connection[]>("/api/Ep/index").toPromise();
  }

}
