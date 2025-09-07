import { ShippingAddress } from "@/app/_Interfaces/Cart.types";
import Cookies from "js-cookie";
import { toast } from "react-toastify";


export async function addToCart(productId: string) {
  const token = Cookies.get('token');
  
  
const headers: HeadersInit = {
  'Content-Type': 'application/json',
  ...(token && { token }), 
};

  

  try {
    const cart = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
      method: 'POST',
      headers,
      body: JSON.stringify({ productId }),
    });

    const cartRes = await cart.json();
    if(cartRes.status=== 'success'){
         toast.success( cartRes.message );
    }
    console.log("cartRes", cartRes);
    


      return cartRes;

   

    

  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Failed to add to cart. Please try again.");
    return { statusMsg: "fail", message: "Network or server error" };
  }
}

export async function updateCart(cartItemId: string, count: number) {
  const token = Cookies.get("token");
  console.log(token);
  console.log("cartItemId", cartItemId);
  console.log(count);
  
  
  

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
      body: JSON.stringify({ count : count }),
    });

    if (!res.ok) throw new Error("Failed to update cart");

    const finalRes = await res.json();
    console.log("cartRes", finalRes);

    if (finalRes.status === "success") {
      toast.success("Cart updated successfully ✅");
    }

    return finalRes;
  } catch (error) {
    console.error(error);
    
  }
}


export async function deleteCartItem(cartItemId: string) {
  const token = Cookies.get("token");
  console.log(token);
  console.log("cartItemId", cartItemId);
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
    });

    if (!res.ok) throw new Error("Failed to delete cart item");

    const finalRes = await res.json();
    console.log("cartRes", finalRes);

    if (finalRes.status === "success") {
      toast.success(finalRes.status );
    }

    return finalRes;  
  } catch (error) {
    console.error(error);
  }
}
export async function checkout(id: string, url: string, formData:ShippingAddress) {
  const token = Cookies.get("token");

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
        body: JSON.stringify({ shippingAddress: formData }),
      }
    );

    if (!res.ok) throw new Error("Failed to create checkout session");

    const finalRes = await res.json();
    console.log("Checkout Response:", finalRes);

    if (finalRes.status === "success") {
      toast.success("Checkout session created successfully ✅");

      if (finalRes.session?.url) {
        window.location.href = finalRes.session.url; 
      }
    } else {
      toast.error("Checkout failed ");
    }

    return finalRes;
  } catch (error) {
    console.error("Checkout Error:", error);
    toast.error("Something went wrong, please try again ❌");
  }
}
