import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromProduct from './store/reducers/product/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product/product.effects';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { CartComponent } from './pages/cart/cart.component';
import { HeaderComponent } from './pages/header/header.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { SubtotalComponent } from './pages/subtotal/subtotal.component';
import { UserEffects } from './store/effects/user/user.effects';
import * as fromUser from './store/reducers/user/user.reducer';
import { LoginComponent } from './pages/login/login.component';
import { DecimalPipe } from '@angular/common';

import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrdersComponent } from './pages/orders/orders.component';
import * as fromCart from './store/reducers/cart/cart.reducer';
import { CartEffects } from './store/effects/cart/cart.effects';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import * as fromOrder from './store/reducers/order/order.reducer';
import { OrderEffects } from './store/effects/order/order.effects';
import { RatingComponent } from './pages/rating/rating.component';
import { RatingListComponent } from './pages/rating-list/rating-list.component';
import { PaymentListComponent } from './pages/payment-list/payment-list.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import { NgxStripeModule } from 'ngx-stripe';

import { AdressListComponent } from './pages/adress-list/adress-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ProductListComponent,
    HomePageComponent,
    NavigationComponent,
    ProductDetailComponent,
    CartComponent,
    HeaderComponent,
    AddUserComponent,
     SubtotalComponent,
     LoginComponent,
     CheckoutComponent,
     OrdersComponent,
     RatingComponent,
     RatingListComponent,
     PaymentListComponent,

     AdressListComponent,

  ],
  imports: [
    AngularFireFunctionsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    TextFieldModule,
    NgxStripeModule.forRoot('pk_test_51ILWaRK6FJ4NvQJQAfitXtvoOesU79Mex29dVJK0y2CXbqoOdmeceakJ0NaCWwvKbUuKTtaSsOj4U2KQeBtfoNZA005UNamqdp'),
    EffectsModule.forRoot([ProductEffects, UserEffects, CartEffects, OrderEffects]),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromProduct.productFeatureKey, fromProduct.reducer),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    StoreModule.forFeature(fromCart.cartFeatureKey, fromCart.reducer),
    StoreModule.forFeature(fromOrder.orderFeatureKey, fromOrder.reducer),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
