import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FridgesModule } from './fridges/fridges.module';
import { LayoutModule } from './layout/layout.module';
import { ModelsModule } from './models/models.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FridgesModule,
    HttpClientModule,
    LayoutModule,
    ModelsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
