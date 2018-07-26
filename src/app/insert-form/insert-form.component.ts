import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Articulo } from '../models/articulo';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-insert-form',
  templateUrl: './insert-form.component.html',
  styleUrls: ['./insert-form.component.css']
})
export class InsertFormComponent implements OnInit {

  productForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
  public inventoryService: InventoryService) {
    this.createForm();
   }

   createForm() {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      cod: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad : ['']
    });
  }

  onSubmit() {
    const product: Articulo = this.productForm.value;
    this.inventoryService.insertProduct(product).subscribe();
    this.activeModal.close();
  }

  ngOnInit() {
  }

}
