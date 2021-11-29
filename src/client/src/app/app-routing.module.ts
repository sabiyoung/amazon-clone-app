import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { AdressListComponent } from './pages/adress-list/adress-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PaymentListComponent } from './pages/payment-list/payment-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { RatingListComponent } from './pages/rating-list/rating-list.component';
import { RatingComponent } from './pages/rating/rating.component';
import { SubtotalComponent } from './pages/subtotal/subtotal.component';

const routes: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'payments', component: PaymentListComponent },
  { path: 'rating', component: RatingListComponent },
  { path: 'user-account', component: AdressListComponent },
  { path: 'search/:searchTerm', component: ProductListComponent },
  { path: '', component: ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
