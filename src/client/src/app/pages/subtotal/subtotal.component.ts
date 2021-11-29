import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store';
import { addToCartSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/products.model';
import { Cart } from '../../../../../shared/models/cart.model';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';

@Component({
  selector: 'app-subtotal',
  templateUrl: './subtotal.component.html',
  styleUrls: ['./subtotal.component.scss'],
})
export class SubtotalComponent implements OnInit {
  products$: Observable<Product[]>;

  cart$!: Observable<Cart | null>;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private productService: ProductService
  ) {
    this.products$ = this.store.select(addToCartSelector);
    this.cart$ = this.store.select(cartSelector);
  }

  ngOnInit(): void {}

  checkout() {
    this.router.navigate(['checkout']);
  }
  getItems(product: Cart) {
    return product.count! < 2 ? 'item' : 'items';
  }
}
