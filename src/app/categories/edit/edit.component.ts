import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Categories } from '../categories';
import { CategoriesService } from '../categories.service';
import { FilePondOptions } from 'filepond';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditCatComponent implements OnInit {
  @Input() categorieId: object;

  @ViewChild('myModal') myModal!: ElementRef;
 
  display = "none";
  
  categories: Categories = new Categories(); // Utiliser le nom 'categories' pour l'objet, pas 'catserv'
 
  constructor(private catserv: CategoriesService) {}

  ngOnInit() {
    this.catserv.find(this.categorieId).subscribe(data => {
      this.categories = data; // Utiliser le nom 'categories' ici
     
    });
  }
  
  updateCategorie = () => {
    this.catserv.update(this.categories._id, this.categories).subscribe((data => {
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
