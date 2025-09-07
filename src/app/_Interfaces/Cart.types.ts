
export interface Product {
  id: string
  title: string
  imageCover: string
    price: number
}


export interface CartItem {
  _id: string
  count: number
  product: Product
  price: number
}


export interface CartData {
  _id: string
  cartOwner: string
  products: CartItem[]
  totalCartPrice: number
  createdAt: string
  updatedAt: string
  __v: number
}


export interface CartResponse {
  status: string
  numOfCartItems: number
  cartId: string
  data: CartData
}


export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}
