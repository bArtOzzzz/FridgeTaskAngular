import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {

  baseUrl: string = 'https://localhost:7243/api';
  constructor(private http: HttpClient) { }

  // Fridge
  listFridges():Observable<any[]> {
    return this.http.get<any>(this.baseUrl + '/fridge');
  }

  createFridge(modelId: string, data: any) {
    return this.http.post(this.baseUrl + '/fridge/' + modelId, data);
  }

  // Model
  listModels():Observable<any[]> {
    return this.http.get<any>(this.baseUrl + '/model');
  }

  // FridgeProduct
  viewFridge(id: string):Observable<any[]> {
    return this.http.get<any>(this.baseUrl + '/fridgeProduct/' + id + '/product');
  }

  createProduct(fridgeId: string, data: any) {
    return this.http.post(this.baseUrl + '/fridgeProduct/' + fridgeId, data);
  }
}
