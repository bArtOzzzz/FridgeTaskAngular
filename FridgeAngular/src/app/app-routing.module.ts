import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFridgeComponent } from './fridges/add-fridge/add-fridge.component';
import { DeleteFridgeComponent } from './fridges/delete-fridge/delete-fridge.component';
import { EditFridgeComponent } from './fridges/edit-fridge/edit-fridge.component';
import { ListFridgesComponent } from './fridges/list-fridges/list-fridges.component';
import { ViewFridgeComponent } from './fridges/view-fridge/view-fridge.component';

const routes: Routes = [
  { path: 'fridges', 
    children: [
      { path: '', component: ListFridgesComponent},
      { path: 'list', component: ListFridgesComponent},
      { path: 'delete/:id', component: DeleteFridgeComponent},
      { path: 'edit/:id', component: EditFridgeComponent},
      { path: 'view/:id', component: ViewFridgeComponent},
      { path: 'create', component: AddFridgeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
