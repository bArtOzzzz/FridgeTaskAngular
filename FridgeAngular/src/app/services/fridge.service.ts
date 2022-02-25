import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {

  baseUrl: string = 'https://localhost:7243/api';
  constructor(private http: HttpClient) { }

  listFridges():Observable<any[]> {
    return this.http.get<any>(this.baseUrl + '/fridge');
  }

  listModels():Observable<any[]> {
    return this.http.get<any>(this.baseUrl + '/model');
  }
}
