import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: "restaurant", loadChildren: () => import('./features/restaurant/restaurant.module').then(m => m.RestaurantModule) },
  { path: "waiter", loadChildren: () => import('./features/waiter/waiter.module').then(m => m.WaiterModule) },
  { path: "table", loadChildren: () => import('./features/table/table.module').then(m => m.TableModule) },
  { path: "order", loadChildren: () => import('./features/order/order.module').then(m => m.OrderModule) },
];
