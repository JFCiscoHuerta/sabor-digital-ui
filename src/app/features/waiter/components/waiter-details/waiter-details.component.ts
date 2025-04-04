import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { WaitersService } from '../../services/waiters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Waiter } from '../../models/waiter';
import { of, switchMap } from 'rxjs';
import { WaiterDto } from '../../models/waiterDto';

@Component({
  selector: 'app-waiter-details',
  imports: [
    CommonModule,
    MatCardModule

  ],
  templateUrl: './waiter-details.component.html',
  styleUrl: './waiter-details.component.css'
})
export class WaiterDetailsComponent {
  private waiterService = inject(WaitersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  waiter?: WaiterDto;
  waiterId?: number

  constructor() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id || isNaN(+id)) {
          console.error("Invalid waiter ID");
          return of(null);
        }
        this.waiterId = +id;
        return this.waiterService.getById(this.waiterId);

      })
    ).subscribe({
      next: (data) => this.waiter = data,
      error: err => console.error("Error fetching waiter details", err)
    });
  }

  goToUpdate() {
    this.router.navigate([`/waiter/edit/${this.waiterId}`]);
  }

  delete() {
    this.waiterService.deleteById(Number(this.waiterId)).subscribe({
      next: () => this.router.navigate(['/waiter/list']),
      error: err => console.error('Error deleting waiter', err)
    });
  }

}
