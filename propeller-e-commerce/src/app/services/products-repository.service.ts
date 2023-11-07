import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AllProducts, OrderedProducts, ProductById } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsRepositoryService {

  private readonly URL = 'https://demo.vendure.io/shop-api'
  constructor(private apollo: Apollo) { }

  getProducts (){
    const GET_PRODUCTS = gql`
    {
      products(options:{
        skip:0
        take: 55
      })
      {
        items{
          id
          name
          collections {
            id
          }
          featuredAsset {
            source
          }
          variants{
            price
          }
        }
      }
    }
`;
    const products = this.apollo
      .watchQuery<AllProducts>({
        query: GET_PRODUCTS,
      })
    return products
  }


  getSortedProducts (value: string) {
    let SORTED_BY_NAME = gql `
    {
      products(options:{
        skip:0
        take: 55
        sort:{
          name: ${value}
        }
      })
       {
        items{
          id
          name
          collections {
            id
          }
          featuredAsset {
            source
          }
          variants{
            price
          }
        }
      }
    }`;
    const sorted = this.apollo.watchQuery<AllProducts>({
      query: SORTED_BY_NAME
    })
    return sorted
  }


  filterProducts(value: string) {
    let FILTER_PRODUCTS = gql`
    {
      products(options:{
        skip:0
        take: 55
        filter: {
          name: {
            contains: "${value}"
          }
        }
      })
       {
            items{
              id
              name
              collections {
                id
              }
              featuredAsset {
                source
              }
              variants{
                price
              }
            }
          }
    }`;

    const filteredProducts = this.apollo.watchQuery<AllProducts>({
      query: FILTER_PRODUCTS
    })
    return filteredProducts
  }

  getProductById (id: number) {
    let PRODUCT_BY_ID = gql `
    {
      product(id: "${id}"){
        id
        name
        collections {
          id
        }
        slug
        description
        featuredAsset {
          source
        }
        variants {
          id
          name
          sku
          price
          priceWithTax
          stockLevel
          options {
            name
          }
        }
      }
    }`;

    const productById = this.apollo.watchQuery<ProductById>({
      query: PRODUCT_BY_ID
    })

    return productById
  }

  orderProduct(productVariantId:number, quantity: number ){
    let ORDER_PRODUCT = gql `
    mutation{addItemToOrder(productVariantId:${productVariantId} quantity:${quantity}){
      __typename ...on Order{
        id
        lines {
          id
          quantity
          productVariant {
            name
            price
          }
        }
      }
    }}`;

    const orderProduct = this.apollo.mutate<OrderedProducts>({
      mutation: ORDER_PRODUCT
    })
    return orderProduct
  }
}
