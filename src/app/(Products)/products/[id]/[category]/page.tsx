import React from 'react'
import SProduct from './SProduct'
import { Product } from '@/app/_Interfaces/products.type'
import Products from '../../ProductCard';
import { getProductById, getProducts } from '@/lib/productsFn';


export default async function Page({ params }: { params: { id: string; category: string } }) {
  const { id, category } = params
  console.log("params:", { id, category })


  const [product, productsData] = await Promise.all([
    getProductById(id),
    getProducts(1 ,category)
  ])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center">Product Not Found</h1>
        <p className="text-center mt-4">The product you are looking for does not exist.</p>
      </div>
    )
  }

  return (
    <>
    
      <SProduct product={product} />


        <div className="mt-10">
          <h2 className="text-3xl ml-30  font-bold mb-6 bg-gradient-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent">
            Related Products
          </h2>
          <Products products={productsData.data} />
        </div>
      
    </>
  )
}
