import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { Cart } from '../../../../../shared/models/cart.model';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import { Product } from '../../../../../shared/models/products.model';
import { updateOrder } from 'src/app/store/actions/order/order.actions';
import { productsSelector } from 'src/app/store/selectors/product/product.selectors';
import { CartService } from 'src/app/services/cart.service';

import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
})
export class PaymentListComponent implements OnInit {
  stripeCheckout: any = null;
  cart$: Observable<Cart | null>;
  product$: Observable<Product[]>;
  cart: string = '';

  constructor(private store: Store<AppState>,
     private router: Router,
      private cartService:CartService) {
    this.cart$ = this.store.select(cartSelector);
    this.product$ = this.store.select(productsSelector);
   
  }
 
  ngOnInit(): void {
    this.stripePaymentGateway();
  }
  pay(product: Cart) {
    return this.cart != product.user?.name;
  }

  checkout(amount: number | undefined, product: Cart) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: environment.STRIPE_PUBLISHABLE_KEY,
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log(stripeToken);
        alert('Payment was successful');
     this.cartService.payment(amount! *100, stripeToken.id).subscribe(() => {
      this.getOrders(product);
     })

      },
    });

    strikeCheckout.open({
      name:"saba",
      description: "payment",
      amount: amount! * 100,
    });
  }

  stripePaymentGateway() {
    if (!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement('script');
      scr.id = 'stripe-script';
      scr.type = 'text/javascript';
      scr.src = 'https://checkout.stripe.com/checkout.js';

      scr.onload = () => {
        this.stripeCheckout = (<any>window).StripeCheckout.configure({
          key: environment.STRIPE_PUBLISHABLE_KEY,
          locale: 'auto',
          token: function (token: any) {
            console.log(token);
            alert('Payment via stripe successfull!');
          },
        });
      };

      window.document.body.appendChild(scr);
    }
  }


  getOrders(cart: Cart) {
    this.store.dispatch(updateOrder({ data: cart }));
    this.router.navigate(['/']);
  }
}
