import { useContext } from "react"
import { AuthContextType } from "@/app/_Interfaces/auth.types"
import { AuthContext } from "../Context/AuthContext"

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider")
  }
  return context
}
