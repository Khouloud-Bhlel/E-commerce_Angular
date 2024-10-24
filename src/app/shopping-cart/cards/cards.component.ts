import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Products } from 'src/app/products/products';
import { ProductsService } from 'src/app/products/products.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  products: Products[] = [];
productOrders : any[]= [];
@Output() productAdded = new EventEmitter();
addProductToCart(product:any) {
this.productAdded.emit(product);
}

constructor(private prodserv:ProductsService) {}
ngOnInit() {
this.loadProducts();
}
loadProducts() {
this.prodserv.getAll()
.subscribe({
next: (products: any) => {
this.products = products;
this.products.forEach(product => {
this.productOrders.push({product:product,quantity:0});
})
},
error: (e) => {
console.log(e);
},
});
}

}
