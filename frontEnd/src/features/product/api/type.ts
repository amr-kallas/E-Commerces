export type ImgProduct = {
  id: string
  image: string
  product_id: string
}

export type Product = {
  title: string
  About: string
  description: string
  category:number
  price: number
  discount: number
  rating: number
  images: ImgProduct[]
}
export type AllProduct=Product[]

export type AddProductBody = {
    title: string
    About: string
    description: string
    price: number
    discount: number
  }
  export type AddProduct = {
    id:string
  }&AddProductBody
export type EditProductBody = {
  id: string
  body: {
    image: File
  } & AddProductBody
}
export type AddImg = {
  id: any
  product_id: string
  image: string
}
export type AddImgBody = {
  body: {
    product_id: string
    image: File
  }
  changePercentageAtIndex: (newProgress: number) => void
}
