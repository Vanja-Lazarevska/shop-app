import { Component, OnInit } from '@angular/core';
import {  FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {  SingleProduct } from 'src/app/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  private id: number
  public singleProduct: SingleProduct
  public panelOpenState = false;
  public quantity: FormControl;
  public step = 0;


  constructor(
    private readonly productService: ProductsService, 
    private readonly router: ActivatedRoute
    ){}


  ngOnInit(): void {
    this.router.params.subscribe((data)=> {
      this.id = data['id']

    })
    this.productService.getProductById(this.id)
    this.productService.singleProduct.subscribe((data)=> {
    this.singleProduct = data})

    this.quantity = new FormControl(0, Validators.min(0))
  }


  public setStep(index: number) {
    this.step = index;
  }

  public handleOrder(productVariantId: number) {

  if(this.quantity.value === 0) return

  this.productService.orderProduct(productVariantId, this.quantity.value)

  this.quantity.reset(0)

  }


}
