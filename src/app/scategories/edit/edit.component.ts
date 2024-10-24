import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Scategories } from '../scategories';
import { ScategoriesService } from '../scategories.service';
import { FilePondOptions } from 'filepond';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditScatComponent {
  @Input() scategorieId: object;

  @ViewChild('myModal') myModal!: ElementRef;
 
  display = "none";
  
  scategories: Scategories = new Scategories(); // Utiliser le nom 'categories' pour l'objet, pas 'catserv'
 
  constructor(private scatserv: ScategoriesService) {}

  ngOnInit() {
    this.scatserv.find(this.scategorieId).subscribe(data => {
      this.scategories = data; // Utiliser le nom 'categories' ici
     
    });
  }
  
  updatecategorie = () => {
    this.scatserv.update(this.scategories._id, this.scategories).subscribe((data => {
      console.log(data);
      this.closeModal();
      window.location.reload();
    }));
  }
  
  openModal() {
    this.display = "block";
  }
  
  closeModal() {
    this.display = "none";
  }

  pondFiles: FilePondOptions["files"];

 
}

