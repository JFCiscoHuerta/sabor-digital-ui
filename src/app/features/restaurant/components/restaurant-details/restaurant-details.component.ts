import { RestaurantService } from './../../services/restaurant.service';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Restaurant } from '../../model/restaurant';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-details',
  imports: [
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.css'
})
export class RestaurantDetailsComponent {
  private restaurantService = inject(RestaurantService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  restaurant?: Restaurant;

  constructor() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.restaurantService.getById(Number(id));
        }
        throw new Error("Invalid restaurant ID");
      })
    ).subscribe({
      next: (data) => this.restaurant = data,
      error: (err) => console.error('Error fetching restaurant details:', err)
    })
  }

  goToUpdate() {
    this.router.navigate([`/restaurant/edit/${this.restaurant?.id}`]);
  }

  delete() {
    this.restaurantService.deleteById(Number(this.restaurant?.id)).subscribe({
      next: () => this.router.navigate([`/restaurant/list`]),
      error: err => console.error(err)
    });
  }

}
