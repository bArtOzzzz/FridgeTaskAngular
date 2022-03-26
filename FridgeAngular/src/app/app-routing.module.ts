import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFridgesComponent } from './fridges/list-fridges/list-fridges.component';
import { ViewFridgeComponent } from './fridges/view-fridge/view-fridge.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { ListModelsComponent } from './models/list-models/list-models.component';
import { ListProductsComponent } from './products/list-products/list-products.component';

const routes: Routes = [
  { path: 'fridges', 
    children: [
      { path: '', component: ListFridgesComponent},
      { path: 'list', component: ListFridgesComponent},
      { path: 'view/:id', component: ViewFridgeComponent}
    ]
  },
  { path: 'models',
    children: [
      { path: '', component: ListModelsComponent},
      { path: 'list', component: ListModelsComponent}
    ]
  },
  { path: 'home',
    children: [
      { path: '', component: HomePageComponent },
      { path: 'page', component: HomePageComponent}
    ]
  },
  { path: 'products',
    children: [
      { path: '', component: ListProductsComponent},
      { path: 'list', component: ListProductsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
