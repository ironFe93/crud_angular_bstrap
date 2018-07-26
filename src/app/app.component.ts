import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';

import { InventoryService } from './inventory.service';
import { InsertFormComponent } from './insert-form/insert-form.component';
import { UpdateFormComponent } from './update-form/update-form.component';
import { DeleteFormComponent } from './delete-form/delete-form.component';
import { Articulo } from './models/articulo';

import { Observable } from 'rxjs';

// https://github.com/akveo/ng2-smart-table/blob/master/src/app/pages/examples/server/basic-example-load.component.ts

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  rows$: Observable<Articulo[]>;

  source: LocalDataSource;
  settings = {
    hideSubHeader: true,
    actions: false,
    columns: {
      index: {
        title: 'Index'
      },
      cod: {
        title: 'Código'
      },
      nombre: {
        title: 'Nombre'
      },
      descripcion: {
        title: 'Descripcion'
      },
      cantidad: {
        title: 'Cantidad'
      }
    }
  };

  constructor(public inventoryService: InventoryService,
    private modalService: NgbModal) {
    this.source = new LocalDataSource();

    this.rows$ = this.inventoryService.getArticulos$();
    this.rows$.subscribe(data => {
      this.source.load(data);
    });
  }

  ngOnInit() {
    this.rows$ = this.inventoryService.getArticulos$();
    this.getProducts();
  }

  getProducts() {
    this.inventoryService.retrieveProducts().subscribe();
  }

  openInsert() {
    this.modalService.open(InsertFormComponent);
  }

  openUpdate() {
    this.modalService.open(UpdateFormComponent);
  }

  openDelete() {
    this.modalService.open(DeleteFormComponent);
  }
}
