import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.css']
})
export class DeleteFormComponent implements OnInit {

  deleteForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
  public inventoryService: InventoryService) {
    this.createForm();
   }

   createForm() {
    this.deleteForm = this.fb.group({
      cod: ['', Validators.required]
    });
  }

  onSubmit() {
    const cod: string = this.deleteForm.value.cod;
    this.inventoryService.deleteProduct(cod).subscribe();
    this.activeModal.close();
  }

  ngOnInit() {
  }

}
