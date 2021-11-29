import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { AppState } from 'src/app/store';
import { addToCartSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/products.model';
import { Cart } from '../../../../../shared/models/cart.model';
import { ProductService } from 'src/app/services/product.service';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import {
  deleteFromCart,
  loadCart,
  updateCart,
} from 'src/app/store/actions/cart/cart.actions';
import { updateReduceCart } from './../../store/actions/cart/cart.actions';
import { CartService } from 'src/app/services/cart.service';
import { loadOrder } from 'src/app/store/actions/order/order.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products$: Observable<Product[]>;
  products: [] = [];
  cart$!: Observable<Cart | null>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cartService: CartService
  ) {
    this.products$ = this.store.select(addToCartSelector);
    this.cart$ = this.store.select(cartSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCart());
    this.store.dispatch(loadOrder());
  }

  onDecrement(product: Product) {
    this.store.dispatch(updateReduceCart({ data: product }));
  }

  addToCart(product: Product) {
    this.store.dispatch(updateCart({ data: product }));
  }
  deleteFromCart(product: Product) {
    this.store.dispatch(deleteFromCart({ data: product }));
    console.log(`product '${product._id}' deleted successfully`);
  }
}
