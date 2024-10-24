import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Categories } from '../categories';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewCatComponent {
  @Input() categorieId: object;
  @ViewChild('myModal') myModal!: ElementRef;
  display = "none";
  categories:Categories=new Categories();
  constructor(private catserv:CategoriesService){}
  ngOnInit(){
  this.catserv.find(this.categorieId).subscribe(data => {
  this.categories = data;
  });
  
  
  
  }
  openModal() {
  this.display = "block";
  }
  closeModal() {
  this.display = "none";
  }
  }

