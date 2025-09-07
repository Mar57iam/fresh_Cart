'use client'

import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { updateCart } from '@/lib/cartFn'
import { Minus, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface QbtnProps {
  count: number
  id: string
}

export default function Qbtn({ count, id }: QbtnProps) {
  const router = useRouter()

  async function handleUpdate(id: string, newCount: number) {
    if (newCount < 1) return // ✅ من باب الأمان: ماينفعش الكمية تبقى أقل من 1
    const res = await updateCart(id, newCount)
    if (res?.status === "success") {
      router.refresh()
    }
  }

  return (
    <TableCell className="text-center">
      <Button
        onClick={() => handleUpdate(id, count - 1)}
        variant="outline"
        size="icon"
        className="h-6 w-6 cursor-pointer"
      >
        <Minus className="h-3 w-3" />
      </Button>

      <input
        type="number"
        value={count}
        readOnly
        className="mx-2 mt-2 w-14 rounded-lg border px-2 py-1 text-center text-sm"
      />

      <Button
        onClick={() => handleUpdate(id, count + 1)}
        variant="outline"
        size="icon"
        className="h-6 w-6 cursor-pointer"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </TableCell>
  )
}
