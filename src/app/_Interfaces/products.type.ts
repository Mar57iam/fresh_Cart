
export type ProductsResponse = {
  results: number
  metadata: {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage?: number
    prevPage?: number
  }
  data: Product[]
}

export interface Product {
  _id: string;
  title: string;
  description?: string | null;
  price: number;
  sold?: number | null;
  images: string[];
  imageCover: string;
  ratingsQuantity?: number;
  subcategory: Subcategory[]; 
  brand: Brand;
  category: Category;
}

type Brand = {

  _id: string;
  name: string;
  image: string;
  slug: string;
}
type Category = {

  _id: string;
  name: string;
  image: string;
  slug: string;
}


type Subcategory = {
  _id: string;
  title: string;
  updatedAt: string; 
};

