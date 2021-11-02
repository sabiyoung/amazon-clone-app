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
import { UserListComponent } from './pages/user-list/user-list.component';
import { SubtotalComponent } from './pages/subtotal/subtotal.component';
import { UserEffects } from './store/effects/user/user.effects';
import * as fromUser from './store/reducers/user/user.reducer';

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

    UserListComponent,
     SubtotalComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    EffectsModule.forRoot([ProductEffects, UserEffects]),
    FormsModule,

    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromProduct.productFeatureKey, fromProduct.reducer),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
