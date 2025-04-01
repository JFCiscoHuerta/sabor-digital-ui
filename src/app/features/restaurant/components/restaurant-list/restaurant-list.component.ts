import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../../model/restaurant';
import { RestaurantDto } from '../../model/restaurantDto';
import { RestaurantService } from './../../services/restaurant.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-restaurant-list',
  imports: [],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css'
})
export class RestaurantListComponent {
  private restaurantService = inject(RestaurantService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  restaurantList?: Restaurant[];


}
