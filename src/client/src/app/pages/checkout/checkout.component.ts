import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import { addToCartSelector } from 'src/app/store/selectors/product/product.selectors';
import { usersSelector } from 'src/app/store/selectors/user/user.selectors';
import { Cart } from '../../../../../shared/models/cart.model';
import { Product } from '../../../../../shared/models/products.model';
import { User } from '../../../../../shared/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loadCart } from 'src/app/store/actions/cart/cart.actions';
import { createAdress } from 'src/app/store/actions/user/user.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  addCustomer: FormGroup;
  cart$: Observable<Cart | null>;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.cart$ = this.store.select(cartSelector);
    this.addCustomer = this.fb.group({
      firstName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      lastName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      adressLineOne: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      adressLineTwo: ['', Validators.compose([Validators.required])],
      zipCode: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      state: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      city: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      phoneNumber: [
        '',
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
      email: [
        '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadCart());
  }
  getItems(product: Cart) {
    return product.count! < 2 ? 'item' : 'items';
  }
  addAdress() {
    this.store.dispatch(createAdress({ data: this.addCustomer.value }));
    console.log({ data: this.addCustomer.value });
    this.addCustomer.reset();
  }
  getDate() {
    const current = new Date();
    const timestamp = current.getTime();
  }

  shipping(cart: Cart) {
    return cart.total_amount! <= 25 ? '$' +cart.total_amount! / 10 : 'Free';
  }

  taxCalculation(cart: Cart) {
    return cart.total_amount! / 14;
  }
  tatalBeforTax(cart: Cart) {
    return cart.total_amount! <= 25
      ? cart.total_amount! + cart.total_amount! / 10
      : cart.total_amount;
  }
  tatalOrder(cart: Cart) {
    return cart.total_amount! <= 25
      ? cart.total_amount! + cart.total_amount! / 10 + cart.total_amount! / 14
      : cart.total_amount! + cart.total_amount! / 14;
  }
}
