import React, { memo } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/_Interfaces/products.type";
import AddToCart from "@/app/(Cart)/cart/AddToCart";
import FavBtn from "./FavBtn";

interface ProductsProps {
  products: Product[];
}


const ProductCardComponent = ({ product }: { product: Product }) => {
  return (
    <Card className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <Link
        href={`/products/${product._id}/${product.category.name}`}
        className="block flex-grow"
      >
        <div className="relative w-full h-48 sm:h-56">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
            placeholder="blur"
            blurDataURL="/placeholder.png"
          />
        </div>
      </Link>

      <div className="p-4 flex-grow">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-lg font-bold mb-2 line-clamp-1 hover:text-purple-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {product.description || "No description available"}
          </p>
        </Link>

        <div className="flex justify-between items-center mt-3">
          <span className="text-primary font-semibold text-lg">
            EGP {product.price}
          </span>
          <FavBtn productId={product._id} />
        </div>
      </div>

      {/* Client Component */}
      <AddToCart productId={product._id} />
    </Card>
  );
};


ProductCardComponent.displayName = "ProductCard";


const ProductCard = memo(ProductCardComponent);

export default memo(function Products({ products }: ProductsProps) {
  return (
    <div className="w-[93%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
});
