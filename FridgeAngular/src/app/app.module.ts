import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FridgesModule } from './fridges/fridges.module';
import { LayoutModule } from './layout/layout.module';
import { ModelsModule } from './models/models.module';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FridgesModule,
    HttpClientModule,
    LayoutModule,
    ModelsModule,
    HomeModule,
    ProductsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
