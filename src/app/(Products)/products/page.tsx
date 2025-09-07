import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import React from 'react'
import ProductCard from './ProductCard';
import { getProducts } from '@/lib/productsFn';

import { ProductsPagination } from './Ppagination';

export default async function Home({ searchParams }: { searchParams?: { page?: string } }) {

  const cookiesStore = await cookies();

  if (!cookiesStore.get("token")) {
    redirect('/login');
  }

   const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const allProducts = await getProducts(page);

  return (
    <div>
      <ProductCard products={allProducts.data} />

      <ProductsPagination
  currentPage={allProducts.metadata.currentPage}
  totalPages={allProducts.metadata.numberOfPages}
/>
      
      </div>
   
  )
}
