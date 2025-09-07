"use client"
import React, { useState, useEffect } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { redirect } from "next/navigation"

const checkoutSchema = z.object({
  details: z.string().min(2, "Details is required"),
  phone: z.string().min(10, "Phone number is required"),
  city: z.string().min(2, "City is required"),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)
  const [cartId, setCartId] = useState<string | null>(null)

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: "",
      city: "",
      phone: "",
    },
  })
 if (!Cookies.get("token")) {
        redirect('/login');
      }
  useEffect(() => {
    
    async function fetchCart() {
      try {
        const token = Cookies.get("token") || ""
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: { "Content-Type": "application/json", token },
        })
        const data = await res.json()
        setCartId(data.cartId)
      } catch (error) {
        console.error("Failed to fetch cart:", error)
      }
    }
    fetchCart()
  }, [])

  async function onSubmit(values: CheckoutForm) {
    if (!cartId) return alert("Cart is not loaded yet")
    setLoading(true)
    try {
      const token = Cookies.get("token") || ""
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", token },
          body: JSON.stringify({ shippingAddress: values }),
        }
      )
      const data = await res.json()

              window.location.href= data.session.url


    } catch (error) {
      console.error("Checkout failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-purple-50 h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl mb-16 bg-purple-200 backdrop-blur-xl rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-purple-600">Checkout</h1>
        <p className="mt-2 text-purple-700">
          Please fill in your details to complete your order.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-6">
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-600">Details</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} className="bg-white text-black" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-600">Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+20 123 456 7890" {...field} className="bg-white text-black" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-600">City</FormLabel>
                  <FormControl>
                    <Input placeholder="Cairo" {...field} className="bg-white text-black" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={loading || !cartId}
              className="w-full cursor-pointer bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-lg hover:from-purple-800 hover:to-purple-600 transition-all"
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
