
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import useLoginStore from "@/State";


export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { username, isLoggedIn, login, logout } = useLoginStore();

  
  return (
    <div className="flex h-screen w-full">
      <div className="bg-white text-black w-64 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Login</h1>
        </div>
        <form className="bg-white flex-1 space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            onClick={() => {
              // Perform login logic here
              // For example, send a request to the server to validate the credentials
              // If the credentials are valid, set isLoggedIn to true and save the credentials in a cookie
              document.cookie = `email=${email}; password=${password}`
              login(email, password)

              router.push('/')
            }}
          >
            Login
          </Button>
          
        </form>
      </div>
    </div>
  )
}
