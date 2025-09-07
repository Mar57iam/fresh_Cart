'use client'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { deleteCartItem } from '@/lib/cartFn'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function DelBtn({ cartItemId }: { cartItemId: string }) {
  const router = useRouter()

  async function handleDelete() {
    const res = await deleteCartItem(cartItemId)
  
    
    if (res?.status === "success") {
      router.refresh() 
    }
  }

  return (
    <>
        <TableCell className='text-center'>
                <Button
                onClick={()=>{
                    (handleDelete())
                }}
                  variant="ghost"
                  size="icon"
                  className="text-red-600  cursor-pointer  text-center  hover:text-red-800"
                >
                 
                  <Trash2 className="h-5 w-5" />
                    Delete
                </Button>
              </TableCell>
    </>
  )
}
