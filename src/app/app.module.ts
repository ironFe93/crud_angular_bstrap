import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule} from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { InsertFormComponent } from './insert-form/insert-form.component';
import { UpdateFormComponent } from './update-form/update-form.component';
import { DeleteFormComponent } from './delete-form/delete-form.component';

import {InventoryService} from './inventory.service';


@NgModule({
  declarations: [
    AppComponent,
    InsertFormComponent,
    UpdateFormComponent,
    DeleteFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgbModule.forRoot()
  ],
  entryComponents: [InsertFormComponent, UpdateFormComponent, DeleteFormComponent],
  providers: [InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
