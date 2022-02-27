import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFridgesComponent } from './list-fridges/list-fridges.component';
import { ViewFridgeComponent } from './view-fridge/view-fridge.component';
import { AddFridgeComponent } from './add-fridge/add-fridge.component';
import { EditFridgeComponent } from './edit-fridge/edit-fridge.component';
import { DeleteFridgeComponent } from './delete-fridge/delete-fridge.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListFridgesComponent,
    ViewFridgeComponent,
    AddFridgeComponent,
    EditFridgeComponent,
    DeleteFridgeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class FridgesModule { }
