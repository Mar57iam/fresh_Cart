"use client"

import React, { useContext } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AuthContext } from "../../../../Context/AuthContext"
import { Loader } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rePassword: z.string().min(6, "Password confirmation required"),
  phone: z.string().min(10, "Phone number must be valid"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"],
})

export default function RegisterForm() {
  const { registerFn , errorMessage , isLoading } = useContext(AuthContext)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerFn(values)
    console.log("Form Submitted ✅", values)
  }

  return (<div className="bg-purple-500 h-screen w-full mx-auto"> 
  <br />


    <div className="max-w-xl mx-auto mt-18 text-white    p-6 bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg">
      <h1 className="text-2xl   font-bold mb-6">Register</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Name */}
         <FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Name</FormLabel>
      <FormControl>
        <Input 
          className="placeholder-white" 
          placeholder="Your full name" 
          {...field} 
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="0123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}

          <Button type="submit" className="w-full bg-gradient-to-r from-purple-700 to-purple-500  text-white">
              {isLoading? <Loader className="ml-2 h-4 w-4 animate-spin" /> : "Register"}
          </Button>
          
          {errorMessage && <p className="bg-red-500 text-center text-white p-2 rounded text-sm mt-2">{errorMessage}</p>}

    <Link href="/login" className="text-sm text-white text-[14px] font-bold hover:underline">
      Already have an account? Login Now
    </Link>
        </form>
      </Form>
    </div>
    </div>
  )
}
