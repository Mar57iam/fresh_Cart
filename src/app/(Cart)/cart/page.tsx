import React from 'react'
import { cookies } from 'next/headers';
import CartTable from './CartTable';
import CheckoutPage from '@/app/checkout/page';
import { redirect } from 'next/dist/client/components/navigation';


export default async function CartPage() {
  const cookiesStore = await cookies();

  if (!cookiesStore.get("token")) {
    redirect('/login');
  }

   async function getCart() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value || '';

    try {
        const cart = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            headers:{
                'Content-Type': 'application/json',
                'token': token 
            
            }
        });

        const cartRes = await cart.json();

        return cartRes;

    } catch (error) {
        console.error("Error fetching cart:", error);
     
    }
}

const cartData = await getCart();

  return (
    <div>
     
      <CartTable cartData={cartData} />
      
    </div>
  )
}
