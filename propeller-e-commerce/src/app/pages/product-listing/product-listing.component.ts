import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';
import { AppState } from 'src/app/store/app.state';
import { filteredProductsValue, sortedProductsValue } from 'src/app/store/products/products.actions';
import { selectFilteredProductsValue, selectSortedProductsValue } from 'src/app/store/products/products.selectors';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit{

  public allProducts: Product[]= []
  public sortValue: FormControl
  public filterValue: FormControl

  constructor(
    private readonly productsService: ProductsService, 
    private readonly store: Store<AppState>
    ){}

  ngOnInit(): void {
    this.initForm()

    this.productsService.getProducts()

    this.productsService.allProducts.pipe(switchMap((data) => {
      this.allProducts = data
      return this.store.select(selectFilteredProductsValue) 
    }),switchMap((data) => {
      this.filterValue.setValue(data)
     return this.productsService.filteredProducts(data).valueChanges
    }), switchMap((data) => {
      this.allProducts = data.data.products.items
      return this.store.select(selectSortedProductsValue)
    })).subscribe((data)=> {
      this.handleSortProductsByPrice(data)
      this.sortValue.setValue(data)
    })
 }

 private initForm () {
    this.sortValue= new FormControl('')
    this.filterValue = new FormControl('')
   this.setLiseteners()
 }

 private setLiseteners(){
  this.sortValue.valueChanges.subscribe((data)=> 
  this.store.dispatch(sortedProductsValue({sortedProductValue: data})))

  this.filterValue.valueChanges.subscribe((data)=> 
  this.store.dispatch(filteredProductsValue({filteredProductValue: data})))
 }

 private handleSortProductsByPrice(value: string) {

  if(!value) return

  if(value === 'lowest') {
    const lowestProducts = [...this.allProducts]
    .sort((a, b) => a.variants[a.variants.length -1].price - b.variants[b.variants.length -1].price)

    this.allProducts = lowestProducts

  } else if(value === 'highest'){
    const highestProducts = [...this.allProducts]
    .sort((a,b) => b.variants[b.variants.length -1].price -  a.variants[a.variants.length -1].price)

    this.allProducts = highestProducts

  } else{
    this.productsService.getSortedProducts(value).valueChanges.subscribe((data)=> {
    this.allProducts = data.data.products.items
    .filter((product) => product.name.toLowerCase().includes(this.filterValue.value))}
    )
  }
 }

  public resetFilters() {
    this.productsService.getProducts()
    this.sortValue.setValue('')
    this.filterValue.setValue('')
  }
}

