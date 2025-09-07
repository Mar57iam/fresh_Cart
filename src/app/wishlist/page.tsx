import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'
import FavTable from './FavTable';
import { FavItem } from '../_Interfaces/favitem';

export default async function page() {

const cookiesStore = await cookies()
const token = cookiesStore.get('token')?.value

if (!token) {
    redirect('/login');
  }

 
async function getFavourites(): Promise<FavItem[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        "token": token || "",
        "Content-Type": "application/json"
      }
    })

    if (!res.ok) {
      console.error("Failed to fetch favourites")
      return []
    }

    const finalRes = await res.json()
    console.log("finall", finalRes.data)
    return finalRes.data as FavItem[]
  } catch (error) {
    console.error(error)
    return []
  }
}




const  favData: FavItem[] = await getFavourites()




  return (
    <div>
      <h2 className= ' mt-5  ml-20 text-purple-600 text-3xl font-bold'>Your Wishlist</h2>

      <FavTable data={favData}    />
    </div>
  )
}
