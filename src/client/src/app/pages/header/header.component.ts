import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { addToCartSelector } from 'src/app/store/selectors/product/product.selectors';
import { Product } from '../../../../../shared/models/products.model';
import { ProductService } from 'src/app/services/product.service';
import { User } from '../../../../../shared/models/user.model';
import {
  loggedInUserSelector,
  usersSelector,
} from 'src/app/store/selectors/user/user.selectors';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import { Cart } from '../../../../../shared/models/cart.model';
import { loginUser, logoutUser } from 'src/app/store/actions/user/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cart$: Observable<Cart | null>;
  users$: Observable<User[]>;
  isAuthenticated$: Observable<User | null>;
  public searchTerm: string = '';

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private productService: ProductService
  ) {
    this.cart$ = this.store.select(cartSelector);
    this.users$ = this.store.select(usersSelector);
    this.isAuthenticated$ = this.store.select(loggedInUserSelector);
  }

  ngOnInit(): void {}
  goToCart() {
    this.router.navigate(['/cart']);
  }
  home() {
    this.router.navigate(['/']);
  }
  signout() {
    this.store.dispatch(logoutUser());
  }
  ordersPage() {
    this.router.navigate(['/orders']);
  }
  account() {
    this.router.navigate(['/user-account']);
  }
  getProducts() {
    this.productService.filterProduct(this.searchTerm);
  }
  searchProducts(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.productService.search.next(this.searchTerm);
  }
}
