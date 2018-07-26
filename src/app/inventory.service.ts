import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import {Articulo} from './models/articulo';

@Injectable()
export class InventoryService {

  private articulos$ = new BehaviorSubject([]);

  url = 'http://localhost:8080/articulos';

  constructor(private http: HttpClient) { }

  retrieveProducts() {
    return this.http.get<Articulo[]>(this.url + '/findAll')
      .pipe(
        tap( resp => {
          const indexResp = this.addIndex(resp);
          this.articulos$.next(indexResp);
        })
      );
  }

  insertProduct(articulo: Articulo) {
    return this.http.post<Articulo>(this.url + '/insert', articulo)
      .pipe(
        tap( resp => {
          const indexResp = this.addToProducts(resp);
          this.articulos$.next(indexResp);
        })
      );
  }

  deleteProduct(cod: string) {
    return this.http.post<boolean>(this.url + '/delete', cod)
      .pipe(
        tap( resp => {
          if (resp) {
            const indexResp = this.removeFromProducts(cod);
            this.articulos$.next(indexResp);
          }
        })
      );
  }

  updateProduct(articulo: Articulo) {
    return this.http.post<Articulo>(this.url + '/update', articulo)
      .pipe(
        tap( resp => {
          const x = this.removeFromProducts(resp.cod);
          x.push(resp);
          const y = this.addIndex(x);
          this.articulos$.next(y);
        })
      );
  }

  getArticulos$() {
    return this.articulos$.asObservable();
  }

  addToProducts(articulo: Articulo) {
    const x = this.articulos$.getValue();
    x.push(articulo);
    const y = this.addIndex(x);
    return y;
  }

  removeFromProducts(cod: string) {
    const articulos: Articulo[] = this.articulos$.getValue();
    let newArticulos = articulos.filter(articulo => this.isInArticulos(articulo, cod));
    newArticulos = this.addIndex(newArticulos);
    return newArticulos;
  }

  isInArticulos = (articulo, cod) => articulo.cod !== cod;

  addIndex(rows: Articulo[]) {
    let index = 1;
    rows.forEach(row => {
      row.index = index;
      index++;
    });
    return rows;
  }

}
