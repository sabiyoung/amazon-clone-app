import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { deleteFromCartSuccess } from 'src/app/store/actions/product/product.actions';
import { addToCartSelector } from 'src/app/store/selectors/product/product.selectors';
import { usersSelector } from 'src/app/store/selectors/user/user.selectors';
import { Product } from '../../../../../shared/models/products.model';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  products$: Observable<Product[]>;
  users$:Observable<User[]>
  products: Product[] = []
  constructor(
    private store: Store<AppState>,
    private router: Router,

 
  ) {
    this.products$ = this.store.select(addToCartSelector)
    this.users$ = this.store.select(usersSelector)
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
  deleteFromCart(product: Product) {
    this.store.dispatch(deleteFromCartSuccess({data: product}))
        console.log(`product '${product._id}' deleted successfully`);
      }

}
