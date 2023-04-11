import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, timeout } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FeeheadService {

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private client: HttpClient) { }

  addFeehead(data : any){
    return this.client.post<any>("http://localhost:3000/feehead", data);
  }

  getFeeheads(){
    return this.client.get<any>("http://localhost:3000/feehead/feeheads");
  }


}
