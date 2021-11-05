import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { AppState } from 'src/app/store';
import { addToCartSelector, quantitySelector, selectedProductSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/products.model';
import { decreaseQty, deleteFromCart, deleteFromCartSuccess, getTotalSuccess, increaseQty, loadProducts } from 'src/app/store/actions/product/product.actions';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  quantity$!: Observable<number>;
  products$: Observable<Product[]>;
products: Product[] = []
quantity:Product[] = []
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private productService: ProductService,
 
  ) {
    this.products$ = this.store.select(addToCartSelector)
    this.quantity$ = this.store.select(quantitySelector);
  
  }
  ngOnInit(): void {

  }

getAmount() {
  let totalAmount = 0
  this.products$.subscribe(products => this.products = products)
  this.products.forEach(product => {
    (product.price * product.quantity)
totalAmount += product.price
  })
  return totalAmount
}

onIncrement() {
 this.store.dispatch(increaseQty())
// this.products$.subscribe(products => this.quantity = products)
//  this.quantity.forEach(product=> {
// return product.quantity + 1
//  })
}

onDecrement() {
  this.store.dispatch(decreaseQty());
}
  deleteFromCart(product: Product) {
    this.store.dispatch(deleteFromCartSuccess({data: product}))
        console.log(`product '${product._id}' deleted successfully`);
      }




}
