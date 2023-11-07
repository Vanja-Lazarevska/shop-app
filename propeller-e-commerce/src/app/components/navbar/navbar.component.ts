import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  private numOfOrders: number[] = [] 
  public order: number = 0

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.numOfOrder.subscribe((data)=> {
      this.numOfOrders.push(data)
      this.order = this.numOfOrders.reduce((prev, cur) => prev + cur)
    })

  }

}
