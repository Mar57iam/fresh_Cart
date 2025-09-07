'use client'
import { addToList, delItem } from '@/lib/wishlist'
import { Heart } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export default function FavBtn({ productId }: { productId: string }) {
  const [isFavorite, setIsFavorite] = useState(false)

  
  useEffect(() => {
    const savedWishlist = Cookies.get("wishlist")
    if (savedWishlist) {
      const parsed = JSON.parse(savedWishlist)
      setIsFavorite(parsed.includes(productId))
    }
  }, [productId])

  const handleClick = async () => {
    const savedWishlist = Cookies.get("wishlist")
    let wishlist = savedWishlist ? JSON.parse(savedWishlist) : []

    if (isFavorite) {
     
      const res = await delItem(productId)
      if (res) {
        wishlist = wishlist.filter((id: string) => id !== productId)
        Cookies.set("wishlist", JSON.stringify(wishlist))
        setIsFavorite(false)
      }
    } else {
     
      const res = await addToList(productId)
      if (res?.status === 'success') {
        wishlist.push(productId)
        Cookies.set("wishlist", JSON.stringify(wishlist))
        setIsFavorite(true)
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
    >
      {isFavorite ? (
        <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
      ) : (
        <Heart className="w-5 h-5 text-gray-400" />
      )}
    </button>
  )
}
