import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

const routes: Routes = [
  {path: 'add-product', component: AddProductComponent},
  {path: 'product-detail', component: ProductDetailComponent},
  {path: 'cart', component: CartComponent},
  {path: 'add-user', component: AddUserComponent},
  {path: '', component: ProductListComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
