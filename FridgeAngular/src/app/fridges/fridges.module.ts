import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFridgesComponent } from './list-fridges/list-fridges.component';
import { ViewFridgeComponent } from './view-fridge/view-fridge.component';
import { EditFridgeComponent } from './edit-fridge/edit-fridge.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFridgeComponent } from './add-fridge/add-fridge.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    ListFridgesComponent,
    ViewFridgeComponent,
    EditFridgeComponent,
    AddFridgeComponent,
    EditProductComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    LayoutModule
  ]
})
export class FridgesModule { }
