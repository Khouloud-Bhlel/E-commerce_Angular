import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductsService } from '../products.service';
import { Products } from '../products';
import { ScategoriesService } from '../../scategories/scategories.service';
import { Scategories } from '../../scategories/scategories';
import { FilePondComponent } from 'ngx-filepond';
@Component({
selector: 'app-create',
templateUrl: './create.component.html',
styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
@ViewChild('myModal') myModal!: ElementRef;
@ViewChild('myPond') myPond: FilePondComponent;

display = "none";
products:Products=new Products()
scategories!:Scategories[] ;
constructor(private prodserv:ProductsService,private scatserv:ScategoriesService){}
ngOnInit(){
this.loadscategorie()
}
loadscategorie(){
return this.scatserv.getAll().subscribe(data=>this.scategories=data),
(error:any)=>console.log(error)
}
ajoutarticle=()=>{
this.prodserv.create(this.products).subscribe((data=>{
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
  data.append('upload_preset', 'Ecommerce');
  data.append('cloud_name', 'drupaoden')
  data.append('public_id', file.name)
  this.prodserv
  .uploadSignature(data)
  .subscribe({
  next: (res) => {
  this.products.imageart = res.url;
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