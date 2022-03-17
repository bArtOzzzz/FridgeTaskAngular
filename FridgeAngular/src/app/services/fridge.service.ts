import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

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

  createFridge(data: any) {
    return this.http.post(this.baseUrl + '/fridge', data, {responseType: "text"});
  }

  updateFridge(fridgeId: number, data: any) {
    return this.http.put(this.baseUrl + '/fridge/' + fridgeId, data, {responseType: "text"});
  }

  deleteFridge(fridgeId: string) {
    return this.http.delete(this.baseUrl + '/fridge/' + fridgeId);
  }

  // Model
  listModels():Observable<any[]> {
    return this.http.get<any>(this.baseUrl + '/model');
  }

  createModel(data: any) {
    return this.http.post(this.baseUrl + '/model', data, {responseType: "text"});
  }

  updateModel(modelId: string, data: any) {
    return this.http.put(this.baseUrl + '/model/' + modelId, data, {responseType: "text"});
  }

  deleteModel(modelId: string) {
    return this.http.delete(this.baseUrl + '/model/' + modelId);
  }

  // FridgeProduct
  viewFridge(id: string):Observable<any[]> {
    return this.http.get<any>(this.baseUrl + '/fridgeProduct/' + id + '/product');
  }

  createProduct(fridgeId: string, data: any) {
    return this.http.post(this.baseUrl + '/fridgeProduct/' + fridgeId, data, {responseType: "text"});
  }

  // Product
  listProducts():Observable<any[]> {
    return this.http.get<any>(this.baseUrl + '/product');
  }

  deleteProduct(productId: string) {
    return this.http.delete(this.baseUrl + '/product/' + productId);
  }

  updateProduct(productId: number, data: any) {
    return this.http.put(this.baseUrl + '/product/' + productId, data, {responseType: "text"});
  }
}
