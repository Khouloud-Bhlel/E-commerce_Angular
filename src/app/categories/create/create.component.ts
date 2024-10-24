import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Categories } from '../categories';
import { FilePondComponent } from 'ngx-filepond';

@Component({
  selector: 'app-createCat',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateCatComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('myPond') myPond: FilePondComponent;
  
  display = "none";
  categories:Categories=new Categories()
  
  constructor(private catserv:CategoriesService){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
  ajoutcategorie=()=>{
  this.catserv.create(this.categories).subscribe((data=>{
  console.log(data)
  this.closeModal()
  window.location.reload();
  }))
  }
  openModal() {
  this.display = "block";
  }
  closeModal() {
  this.display = "none";
  }
  pondOptions = {
    class: 'my-filepond',
    multiple: false,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png',
    server: {
    process: (fieldName:any, file:any, metadata:any, load:any, error:any,
    progress:any, abort:any) => {
    const data=new FormData();
    data.append('file', file);
    data.append('upload_preset', 'Ecommerce_cloudinary');
    data.append('cloud_name', 'dazfiaqow')
    data.append('public_id', file.name)
    this.catserv
    .uploadSignature(data)
    .subscribe({
    next: (res) => {
    this.categories.imagecategorie = res.url;
    load(res);
    },
    error: (e) => {
    console.log(e);
    error(e);
    return () => {};
  },
  complete: () => {
  console.log('done');
  return () => {
  abort();
  };
  }
  })
  },
  revert: (uniqueFileId:any, load:any, error:any) => {
  error('Error');
  load();
  },
  }
  }
  
  }