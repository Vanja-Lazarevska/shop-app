export interface AllProducts {
    products: ProductItems
}

export interface ProductItems {
    _typename: string,
    items: Product[]
}

export interface Product {
        typename: string,
        id: number
        name: string
        collections: {id: number}[]
        featuredAsset: ProductImage
        variants: ProductPrice[]

}

export interface ProductImage {
        source: string
}

export interface ProductPrice {
    price: number
}


export interface ProductById {
    product: SingleProduct
}
export interface SingleProduct  {
    id: number
    name: string
    collections: {id: number}[]
    slug:string
    description: string
    featuredAsset: ProductImage
    variants: VarianstOfProduct[]

}

export interface VarianstOfProduct {
        id: number
        name: string
        sku: string
        price: number
        priceWithTax: number
        stockLevel: string
    }

export interface ProductOptions {
        name: string
}


export interface ProductsByCategory {
    collection: ProductByCategory
}

export interface ProductByCategory {
        name: string
        featuredAsset: ProductImage 
        productVariants: SimpleProductVariants 
         
}

export interface SimpleProductVariants {
    items: {
        name: string, 
        price: number
    }[]
}


export interface OrderedProducts {
    addItemToOrder: ItemOfOProducts
}

export interface ItemOfOProducts {
          __typename: string,
          id: number,
          lines: Lines[]
}

export interface Lines {
        id: number,
        quantity:number,
        productVariant: {
          name: string,
          price: number
        }
    
}