export type Images={
    created_at:string,
    id:number,
    image:string,
    updated_at:string,
    product_id:number
}
export type Product={
    About:string,
    category:number,
    created_at:string,
    description:string,
    discount:string,
    id:number,
    price:string,
    rating:string
    ratings_number:string
    status:string,
    title:string,
    updated_at:string,
    images:Images[]
}