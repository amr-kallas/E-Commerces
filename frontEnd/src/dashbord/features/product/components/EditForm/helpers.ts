import { Product } from '../../api/type'
import {  queries as productQuery } from '../../api/queries'
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
export const cancelImg=(ids:any)=>{
  const DeleteImg = productQuery.useDeleteImg()
  ids.forEach((id:number) => {
    DeleteImg.mutateAsync(String(id), {
      onError: (error) => {
        console.log(error)
      },
    })
  })
}
