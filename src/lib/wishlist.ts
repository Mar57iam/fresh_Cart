import Cookies from "js-cookie"


import { toast } from "react-toastify"



export async function addToList(productId: string) {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("token") || "", 
      },
      body: JSON.stringify({ productId }),
    })

    const data = await res.json()
    console.log("Wishlist response:", data)

    if (res.ok) {
      toast.success(data.message || "Added to wishlist")
      console.log(" Added to wishlist successfully")
      return { status: "success", data }   
    } else {
      toast.error(data.message || "Failed to add to wishlist")
      console.error(" Error adding to wishlist:", data.message)
      return { status: "error", data }     
    }
  } catch (err) {
    console.error(" Network error:", err)
    toast.error("Network error, please try again")
    return { status: "error", data: null }
  }
}

export async function delItem(id:string) {

  try {
    const deleteItem = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
           method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("token") || "", 
      },
    }
    )
    const delItemRes = await deleteItem.json()
     console.log("Deleted:", delItemRes);
     toast.success(delItemRes.message)
    
    return delItemRes;
    
  } catch (error) {

 toast.error("Network error, please try again")
    throw error

    
    
  }
  
}
