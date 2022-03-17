import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListModelsComponent } from './list-models/list-models.component';
import { AddModelComponent } from './add-model/add-model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditModelComponent } from './edit-model/edit-model.component';



@NgModule({
  declarations: [
    ListModelsComponent,
    AddModelComponent,
    EditModelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ModelsModule { }
