import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { authGuard } from '../authentification/auth.guard';
const routes: Routes = [
  { path: 'products', redirectTo: 'products/index', pathMatch: 'full'},
{ path: 'products/index', component: IndexComponent,canActivate: [authGuard] },
{ path: 'products/:productId/view', component: ViewComponent },
{ path: 'products/create', component: CreateComponent },
{ path: 'products/:productId/edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
