import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFridgesComponent } from './fridges/list-fridges/list-fridges.component';
import { ViewFridgeComponent } from './fridges/view-fridge/view-fridge.component';

const routes: Routes = [
  { path: 'fridges', 
    children: [
      { path: '', component: ListFridgesComponent},
      { path: 'list', component: ListFridgesComponent},
      { path: 'view/:id', component: ViewFridgeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
