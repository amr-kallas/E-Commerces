import { Product } from '../../api/type'

export const productDetails = (product: Product) => {
  const images =
    product.images && product.images.length > 0
      ? product.images.map((img) => {
          return img.image
        })
      : []
  return {
    category: product.category,
    title: product.title,
    description: product.description,
    price: product.price,
    discount: product.discount,
    About: product.About,
    images: images,
  }
}
