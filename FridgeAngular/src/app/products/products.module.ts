import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products/list-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListProductsComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
