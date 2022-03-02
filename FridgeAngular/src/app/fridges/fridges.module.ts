import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFridgesComponent } from './list-fridges/list-fridges.component';
import { ViewFridgeComponent } from './view-fridge/view-fridge.component';
import { EditFridgeComponent } from './edit-fridge/edit-fridge.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddFridgeComponent } from './add-fridge/add-fridge.component';

@NgModule({
  declarations: [
    ListFridgesComponent,
    ViewFridgeComponent,
    EditFridgeComponent,
    AddFridgeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class FridgesModule { }
