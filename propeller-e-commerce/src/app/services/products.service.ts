import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Lines, Product, SingleProduct } from '../interfaces/products.interface';
import { ProductsRepositoryService } from './products-repository.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  allProducts: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([])
  singleProduct: Subject<SingleProduct> = new Subject<SingleProduct>()
  order: Lines[] = []
  numOfOrder: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  constructor(private readonly productsRepository: ProductsRepositoryService) { }

  getProducts () {
    this.productsRepository.getProducts()
    .valueChanges.subscribe((result)=> this.allProducts.next(result.data.products.items))
  }

  getSortedProducts (value:string) {
   return this.productsRepository.getSortedProducts(value)
  }

  filteredProducts (value: string) {
    return this.productsRepository.filterProducts(value)
  }

  getProductById(id: number) {
    return this.productsRepository.getProductById(id).valueChanges
    .subscribe((result)=> this.singleProduct.next(result.data.product))
  }

  orderProduct(productVariantId: number, quantity:number) {
    return this.productsRepository.orderProduct(productVariantId, quantity)
    .subscribe((data)=>{ 
      if(!data.data) return
      this.numOfOrder.next(quantity)

      this.order.push(...data.data.addItemToOrder.lines)
    })
  }
}
