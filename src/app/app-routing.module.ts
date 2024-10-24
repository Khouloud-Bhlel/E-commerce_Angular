import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { CategoriesComponent } from './categories/index/index.component';
import { ScategoriesComponent } from './scategories/index/index.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: 'log-in', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'categories', component: CategoriesComponent , canActivate:[AuthGuard]},
  { path: 'scategories', component: ScategoriesComponent  , canActivate:[AuthGuard]}, // Add this line for the ScategoriesComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
