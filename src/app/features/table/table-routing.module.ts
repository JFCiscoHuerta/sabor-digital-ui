import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableCreateComponent } from './components/table-create/table-create.component';
import { TableDetailsComponent } from './components/table-details/table-details.component';
import { TableListComponent } from './components/table-list/table-list.component';

const routes: Routes = [
  { path: 'create', component: TableCreateComponent },
  { path: 'edit/:id', component: TableCreateComponent },
  { path: 'all/:id', component: TableListComponent },
  { path: ':id', component: TableDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
