import { Products } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { asap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:4000/api/product/';

  constructor(private httpClient: HttpClient) {}
  getProducts(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete(this.url + id);
  }
  createProduct(product: Products): Observable<any> {
    return this.httpClient.post(this.url, product);
  }
  editProduct(id: string): Observable<any> {
    return this.httpClient.get(this.url + id);
  }
  updateProduct(id: string, product: Products): Observable<any> {
    return this.httpClient.put(this.url + id, product);
  }
}
