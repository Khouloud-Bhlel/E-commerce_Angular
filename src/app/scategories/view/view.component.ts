import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Scategories } from '../scategories';
import { ScategoriesService } from '../scategories.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewCScatomponent {
  @Input() scategorieId: object;
  @ViewChild('myModal') myModal!: ElementRef;
  display = "none";
  scategories:Scategories=new Scategories();
  constructor(private scatserv:ScategoriesService){}
  ngOnInit(){
  this.scatserv.find(this.scategorieId).subscribe(data => {
  this.scategories = data;
  });
  
  
  
  }
  openModal() {
  this.display = "block";
  }
  closeModal() {
  this.display = "none";
  }
  }



