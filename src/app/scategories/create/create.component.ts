import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Scategories } from '../scategories';
import { ScategoriesService } from '../scategories.service';
@Component({
selector: 'app-createscat',
templateUrl: './create.component.html',
styleUrls: ['./create.component.css']
})
export class CreateScatComponent implements OnInit {
@ViewChild('myModal') myModal!: ElementRef;

display = 'none';
  scategories: Scategories = new Scategories();

  constructor(private scategoriesService: ScategoriesService) {}

ngOnInit(){
}

ajoutScategorie = () => {
  this.scategoriesService.create(this.scategories).subscribe(
    (data) => {
      console.log(data);
      this.closeModal();
      window.location.reload;
    }
  )}
openModal() {
  this.display = 'block';
}

closeModal() {
  this.display = 'none';
}

}