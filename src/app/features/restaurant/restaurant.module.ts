import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantCreateComponent } from './components/restaurant-create/restaurant-create.component';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantRoutingModule } from './restaurant-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RestaurantCreateComponent,
    RestaurantListComponent,
    RestaurantRoutingModule
  ],
  exports: [
    RestaurantCreateComponent,
    RestaurantListComponent,
  ],
  providers: [
    RestaurantService,
  ]
})
export class RestaurantModule { }
