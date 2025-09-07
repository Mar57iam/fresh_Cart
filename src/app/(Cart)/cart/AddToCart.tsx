'use client'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { addToCart } from '@/lib/cartFn'
import { Loader } from 'lucide-react'
import React, { useState } from 'react'

export default function AddToCart( {productId}: {productId: string}) {


    const [loading, setLoading] = useState(false);
  return (
    <div>
        <CardFooter className="p-2 pt-0">
            <Button   onClick={() => {
              setLoading(true);
              addToCart(productId)
                .finally(() => setLoading(false));
            }}
              className="w-full cursor-pointer  bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-lg  hover:from-purple-800 hover:to-purple-600 transition-all"
            >
              {loading ?<Loader className="ml-2 h-4 w-4 animate-spin" /> : "Add to Cart"}
            </Button>
          </CardFooter>
    </div>
  )
}
