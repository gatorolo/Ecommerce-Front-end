import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Productos } from '../models/productos';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiServerUrl= 'http://localhost:8080'

  public search = new BehaviorSubject<string>("");

  constructor(private http:HttpClient) { }

  public getproductos():Observable<Productos[]>{
    return this.http.get<Productos[]>(`${this.apiServerUrl}/productos/all`);
  }

  public addProducto(producto:Productos):Observable<Productos> {
    return this.http.post<Productos>(`${this.apiServerUrl}/productos/add`, producto);
  }

  public updateProducto(producto:Productos):Observable<Productos> {
    return this.http.put<Productos>(`${this.apiServerUrl}/productos/update`, producto);
  }

  public deleteProducto(productoId:number):Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/productos/delete/${productoId}`);
  }

  cartSubject = new Subject<any>();
}
