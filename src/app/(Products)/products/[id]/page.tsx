
import React from 'react'

import SProduct from './[category]/SProduct'

export default async function page({params} : {params: {id: string}}) {
     console.log("props", params.id)
     const id = params.id

     async function specificProduct(id: string) {
        try {
            const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            const data = await res.json()
            console.log('dataaa', data);
                        
            return data.data
        } catch (error) {
            
        }

     }

     const product = await specificProduct(id)

  return (


    < >
   <SProduct product={product} />
    </ >
  )
}
