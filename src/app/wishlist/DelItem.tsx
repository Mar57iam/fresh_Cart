'use client'
import { delItem } from '@/lib/wishlist'
import React from 'react'
import { useRouter } from "next/navigation"

export default function DelItem({itemId}:{itemId :string } ) {
    const router = useRouter()


  async function handleRemove() {
    const res = await delItem(itemId)
    if (res?.status === "success") {
      router.refresh() 
    }
  }
  return (
    <div>
        <button 
        onClick={()=>{
            handleRemove()
        }}
        className="mt-2 px-2 py-1 cursor-pointer text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 w-fit">
    Remove
  </button>
    </div>
  )
}
