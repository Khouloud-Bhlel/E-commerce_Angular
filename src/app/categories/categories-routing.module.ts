import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './index/index.component';

const routes: Routes = [
{ path: 'categories', component: CategoriesComponent},

];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class CategoriesRoutingModule { }
