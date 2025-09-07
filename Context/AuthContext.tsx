'use client'
import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { AuthContextType, LoginValues, RegisterValues } from '@/app/_Interfaces/auth.types'


export const AuthContext = createContext< AuthContextType  | null>(null)
type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps ) {

  const router = useRouter()

const [token, setToken] = useState<string | null>(null)
const [errorMessage, setErrorMessage] = useState<string>("")
const [isLoading , setIsLoading] = useState<boolean>(false)


    useEffect(() => {
    const savedToken = Cookies.get("token")
    if (savedToken) setToken(savedToken)
  }, [])


    const registerFn = async (values: RegisterValues)=>{
        try {
            setIsLoading(true)
            const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: values.name,
        email: values.email,
        password: values.password,
        rePassword: values.rePassword,
        phone: values.phone, 
                 })
            })
            const data = await res.json()
            setIsLoading(false)
            console.log("Registration successful:", data)
            if(data.message === "success"){
              Cookies.set("token", data.token)
              setToken(data.token)
              router.push('/')
            
            }else{
                  setErrorMessage(data.message || "Registration failed, please try again.") 
            }

        } catch (error) {
          setIsLoading(false)
            console.error("Registration failed:", error)
            
        }
    }  

    const loginFn = async (values: LoginValues)=>{
        try {
            setIsLoading(true)
            const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  
        email: values.email,
        password: values.password,
                 })
            })
            const data = await res.json()
            setIsLoading(false)
            console.log("Login successful:", data)
            if(data.message === "success"){
              Cookies.set("token", data.token)
              setToken(data.token)
              router.push('/')
            
            }else{
                  setErrorMessage(data.message || "Login failed, please try again.") 
            }

        } catch (error) {
          setIsLoading(false)
            console.error("Login failed:", error)
            
        }
    } 

    const logOut = () => {
      Cookies.remove("token")
      setToken(null)
      router.push('/login')
    }

  return (
    <AuthContext.Provider value={{ registerFn, loginFn, errorMessage, isLoading  , token, logOut}}>
      {children}
    </AuthContext.Provider >
  )

  
}


