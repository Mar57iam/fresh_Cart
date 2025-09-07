import React from "react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Qbtn from "./Qbtn"
import { CartResponse, CartItem } from "@/app/_Interfaces/Cart.types"
import DelBtn from "./DelBtn"
import Link from "next/link"

export default function CartTable({ cartData }: { cartData: CartResponse }) {
  const products = cartData?.data?.products || []

  if (!products || products.length === 0) {
    return <p className="text-center mt-6 text-gray-500">Your cart is empty</p>
  }

  return (
    <div className="overflow-x-auto w-[90%] mx-auto mt-10 rounded-lg border shadow-md">
      <Table>
        <TableHeader className="bg-gray-50 h-10">
          <TableRow className="h-12">
            <TableHead className="text-purple-700 text-center">Image</TableHead>
            <TableHead className="text-purple-700 text-center">Product</TableHead>
            <TableHead className="text-purple-700 text-center">Quantity</TableHead>
            <TableHead className="text-purple-700 text-center">Price</TableHead>
            <TableHead className="text-purple-700 text-center">Total</TableHead>
            <TableHead className="text-purple-700 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((item: CartItem) => (
            <TableRow key={item._id}>
              <TableCell>
                <div className="w-30 mx-auto text-center h-30 rounded-full relative">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </TableCell>

              <TableCell className="font-semibold text-center">
                {item.product.title.split(" ").slice(0, 3).join(" ")}
                {item.product.title.split(" ").length > 4 && "..."}
              </TableCell>

              <Qbtn count={item.count} id={item.product.id} />

              <TableCell className="font-semibold text-center">EGP {item.price}</TableCell>

              <TableCell className="font-semibold text-center">
                EGP {item.price * item.count}
              </TableCell>

              <DelBtn cartItemId={item._id} />
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 text-right text-purple-600 p-2 font-bold text-lg">
        Total Cart Price: EGP {cartData.data.totalCartPrice}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          href="/checkout"
          className="w-[95%] text-center font-semibold p-1 m-8 cursor-pointer  
                     bg-gradient-to-r from-purple-700 to-purple-500 text-white 
                     rounded-lg hover:from-purple-800 hover:to-purple-600 
                     transition-all"
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}
