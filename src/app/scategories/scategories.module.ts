import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScategoriesRoutingModule } from './scategories-routing.module';
import { FilePondModule } from 'ngx-filepond';

import { EditScatComponent } from './edit/edit.component';
import {  CreateScatComponent } from './create/create.component';
import { ViewCScatomponent } from './view/view.component';

import { RouterModule } from '@angular/router';
import { ScategoriesComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CloudinaryModule } from '@cloudinary/ng';
@NgModule({
  declarations: [
    ScategoriesComponent,
    EditScatComponent,
    CreateScatComponent,
    ViewCScatomponent
  ],
  imports: [
    CommonModule,
    ScategoriesRoutingModule,
    FilePondModule,
    RouterModule,
    FormsModule,
ReactiveFormsModule,
CloudinaryModule
  ]
})
export class ScategoriesModule { }
