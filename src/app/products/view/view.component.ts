import { Component, OnInit, ViewChild, Input,ElementRef } from
'@angular/core';
import { ProductsService } from '../products.service';
import { Products } from '../products';
@Component({
selector: 'app-view',
templateUrl: './view.component.html',
styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
@Input() productId: object;
@ViewChild('myModal') myModal!: ElementRef;
display = "none";
products:Products=new Products();
constructor(private prodserv:ProductsService){}
ngOnInit(){
this.prodserv.find(this.productId).subscribe(data => {
this.products = data;
});
35
}
openModal() {
this.display = "block";
}
closeModal() {
this.display = "none";
}
}