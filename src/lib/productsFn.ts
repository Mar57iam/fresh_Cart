import { ProductsResponse, Product } from "@/app/_Interfaces/products.type"

export async function getProducts(page: number = 1, category?: string): Promise<ProductsResponse> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=40`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error("Failed to fetch products")

    const finalRes: ProductsResponse = await res.json()

    // فلترة حسب الكاتيجوري لو موجود
    if (category) {
      const decodedCategory = decodeURIComponent(category)
      finalRes.data = finalRes.data.filter((product: Product) =>
        product.category?.name?.toLowerCase() === decodedCategory.toLowerCase()
      )
      finalRes.results = finalRes.data.length
      finalRes.metadata.numberOfPages = Math.ceil(finalRes.results / finalRes.metadata.limit)
    }

    return finalRes
  } catch (error) {
    console.error("Error fetching products:", error)
    return {
      results: 0,
      metadata: { currentPage: 1, numberOfPages: 1, limit: 40 },
      data: [],
    }
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error("Failed to fetch product")

    const finalRes = await res.json()
    return finalRes.data
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}
