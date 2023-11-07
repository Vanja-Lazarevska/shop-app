import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';

const routes: Routes = [
  {path: '', component: ProductListingComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'orders', component: OrderDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
