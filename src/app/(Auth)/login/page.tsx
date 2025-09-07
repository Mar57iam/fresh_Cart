"use client"

import React from "react";
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
import { useAuth } from "../../../../Hooks/useAuth";

const formSchema = z.object({

  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  

})
export default function LoginForm() {


  const { loginFn , errorMessage , isLoading } = useAuth()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginFn(values)
    console.log("Form Submitted ✅", values)
  }

  return (<div className="bg-purple-500  h-screen w-full mx-auto"> 
  <br />


    <div className="max-w-xl mx-auto  text-white mt-40   p-6 bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg">
      <h1 className="text-2xl   font-bold mb-6">Login</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
       


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

        


          {/* Submit Button */}

          <Button type="submit" className="w-full bg-gradient-to-r from-purple-700 to-purple-500  text-white">
              {isLoading? <Loader className="ml-2 h-4 w-4 animate-spin" /> : "Login "}
          </Button>
          
          {errorMessage && <p className="bg-red-500 text-center text-white p-2 rounded text-sm mt-2">{errorMessage}</p>}

    <Link href="/register" className="text-sm text-white text-[14px] font-bold hover:underline">
      Don't have an account? Register Now
    </Link>
        </form>
      </Form>
    </div>
    </div>
  )
}

