import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';
import { MaterialModule } from './material/material.module';
import { ProductsService } from './services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache } from '@apollo/client/core';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component'
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './store/app.state';

@NgModule({
  declarations: [
    AppComponent,
    ProductListingComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    NavbarComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ApolloModule,
    RouterModule,
    StoreModule.forRoot(AppReducer)
  ],
  providers: [ProductsService, {
    provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://demo.vendure.io/shop-api'
          })
        }},
        deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
