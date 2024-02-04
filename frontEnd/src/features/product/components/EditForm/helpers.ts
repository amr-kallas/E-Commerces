import { Product } from '../../api/type'

export const productDetails = (product: Product) => {
    
  return {
    category: product.category,
    title: product.title,
    description: product.description,
    price: product.price,
    discount: product.discount,
    About: product.About,
  }
}
