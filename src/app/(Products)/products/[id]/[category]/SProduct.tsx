import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card" 
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/app/_Interfaces/products.type'
import FavBtn from '../../FavBtn'

export default function SProduct( { product } :{ product: Product }  ) {
  return (
    <>
         <div className="flex flex-col md:flex-row gap-6 w-[80%] mx-auto mt-10">

  <div className="w-full md:w-1/4">
  
      <div className="relative h-100 w-full">
        <Image 
          src={product?.imageCover || "/placeholder.jpg"}
          alt={product?.title || "Product image"}
          fill
           priority={true}
         
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

  </div>

  <div className="w-full mt-10 md:w-3/4">
   
      <CardContent className="p-4 h-full overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-800">
          {product?.description || "No description available"}
        </h3>
        
        <div className="mt-4 flex justify-between space-y-2">
          
          <p className="text-md font-semibold text-gray-500">
            Brand: {product?.brand?.name}
          </p>
          <p className="text-md font-semibold   text-gray-500">
            Category: {product?.category?.name}
          </p>
        </div>


         <div className="mt-4 flex justify-between space-y-2">
          
          <p className="text-xl font-bold text-purple-700">
            EGP {product?.price}
          </p>
         <FavBtn productId={product?._id}/>
        </div>

         <Button 
              className="w-full cursor-pointer mt-2   bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded hover:from-purple-800 hover:to-purple-600 transition-all"
             
            >
              Add to Cart
            </Button>
      </CardContent>


    
   
  </div>
</div>   
    </>
  )
}
