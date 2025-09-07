import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image';
import React from 'react'
import { FavItem } from '../_Interfaces/favitem';
import AddToCart from '../(Cart)/cart/AddToCart';
import DelItem from './DelItem';

export default function FavTable({data} : { data: FavItem[] }) {
    console.log('datttttt', data);
    
  return (
    <div>
      <Table className="w-[90%] mx-auto mt-10 shadow-xl rounded-2xl">
        <TableCaption>Your saved wishlist items.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <div className="flex items-center gap-5">
                  <div className="relative w-40 h-40">
                    <Image
                      src={item.imageCover}
                      alt={item.slug}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                 <div className="flex flex-col gap-1">
  <span className="font-medium">{item.title}</span>
  <span className="text-green-600">{item.price} EGP</span>

   <DelItem itemId={item._id} />
</div>

                </div>
              </TableCell>

            
              <TableCell className='w-20 text-center'>
                <AddToCart productId={item._id}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
