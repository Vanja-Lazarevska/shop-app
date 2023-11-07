import { Component, OnInit } from '@angular/core';
import { Lines } from 'src/app/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public orderedData: Lines[] = []
  private pricePerProduct: number

  constructor(private readonly productsService:ProductsService){}

  ngOnInit(): void {
    this.orderedData = this.productsService.order
  }

  public calculatePricePerProduct(product: Lines) {
    this.pricePerProduct = product.productVariant.price * product.quantity 
    return this.pricePerProduct
  }

  public calculcateTotal() {
    return this.orderedData.map((order) => order.productVariant.price * order.quantity).reduce((p, c)=> p + c)

  }

  displayedColumns: string[] = ['position','name', 'quantity', 'price', 'total price' ];

}
