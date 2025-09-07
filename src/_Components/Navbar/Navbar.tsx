'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '../../../Hooks/useAuth'
import { Menu, X } from 'lucide-react' 

export default function Navbar() {
  const { token, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!token) return null

  return (
    <nav className="w-[90%] mx-auto flex items-center justify-between p-4 
      bg-gradient-to-r from-purple-500 to-purple-700 
      rounded mt-3 text-white relative">

      
      <div className="text-xl font-bold">Fresh Cart</div>

     
      <button 
        className="md:hidden block"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

    
      <ul className="hidden text-md font-semibold md:flex gap-6">
        <li><Link href="/" className="hover:underline">Home</Link></li>
        <li><Link href="/products" className="hover:underline">Products</Link></li>
        <li><Link href="/cart" className="hover:underline">Cart</Link></li>
        <li><Link href="/categories" className="hover:underline">Categories</Link></li>
        <li><Link href="/brands" className="hover:underline">Brands</Link></li>
        <li><Link href="/wishlist" className="hover:underline">Wishlist</Link></li>
      </ul>

    
      <Button
        className="hidden md:block text-white bg-transparent cursor-pointer text-md font-semibold hover:bg-transparent hover:underline"
        onClick={logOut}
      >
        Sign Out
      </Button>

      
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-purple-600 p-4 flex flex-col gap-4 md:hidden rounded-b">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setIsOpen(false)}>Products</Link>
          <Link href="/cart" onClick={() => setIsOpen(false)}>Cart</Link>
          <Link href="/category" onClick={() => setIsOpen(false)}>Category</Link>
          <Link href="/brands" onClick={() => setIsOpen(false)}>Brands</Link>
          <Link href="/wishlist" onClick={() => setIsOpen(false)}>Wishlist</Link>
          <Button
            className="text-white bg-transparent cursor-pointer text-md font-semibold hover:bg-transparent hover:underline"
            onClick={() => { logOut(); setIsOpen(false) }}
          >
            Sign Out
          </Button>
        </div>
      )}
    </nav>
  )
}
