import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryService } from '../inventory.service';
import { Articulo } from '../models/articulo';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  updateForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
  public inventoryService: InventoryService) {
    this.createForm();
   }

   createForm() {
    this.updateForm = this.fb.group({
      nombre: ['', Validators.required],
      cod: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad : ['']
    });
  }

  onSubmit() {
    const product: Articulo = this.updateForm.value;
    this.inventoryService.updateProduct(product).subscribe();
    this.activeModal.close();
  }

  ngOnInit() {
  }

}
