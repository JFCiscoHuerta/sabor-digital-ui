import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Waiter } from '../../models/waiter';
import { Router } from '@angular/router';
import { WaitersService } from '../../services/waiters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-waiter-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './waiter-card.component.html',
  styleUrl: './waiter-card.component.css'
})
export class WaiterCardComponent {
  @Input() waiter!: Waiter;

  private router = inject(Router);

  goToDetails() {
    this.router.navigate([`/waiter/${this.waiter.id}`]);
  }

}
