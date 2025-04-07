import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantCreateComponent } from './components/restaurant-create/restaurant-create.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantModule } from './restaurant.module';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'list', component: RestaurantListComponent },
  { path: 'create', component: RestaurantCreateComponent },
  { path: ':id', component: RestaurantDetailsComponent },
  { path: 'edit/:id', component: RestaurantCreateComponent }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
