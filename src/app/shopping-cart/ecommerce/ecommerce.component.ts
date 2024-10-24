import { Component, ViewChild } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { PanierComponent } from '../panier/panier.component';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent {
  public collapsed = true;
  orderFinished = false;
  @ViewChild('productsC')
  productsC: CardsComponent;
  @ViewChild('shoppingCartC')
  shoppingCartC: PanierComponent;
  
  toggleCollapsed(): void {
  this.collapsed = !this.collapsed;
  }
  finishOrder(orderFinished: any) {
  this.orderFinished = orderFinished;
  if (this.orderFinished===false){
    this.productAdded.map((p)=>{
    p.quantity=0;
    })
    this.productAdded =[]
    }

  }
  reset() {
  this.orderFinished = false;
  }
  productAdded :any[]=[]
  addProductToCart(product:any) {
    let existe=false;
    this.productAdded.map((p)=>{
    if(p.product._id===product.product._id) {existe=true}
    })
    if(existe===false) this.productAdded.push(product);
    }

}
