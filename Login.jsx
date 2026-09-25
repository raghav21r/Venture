import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")
  const navigate                = useNavigate()

  const handleLogin = async () => {
  try {
    const res = await axios.post("http://127.0.0.1:8000/Login", { email, password })
    if (res.data.status === "Login successfull") {
      localStorage.setItem("user_email", res.data.email)
      localStorage.setItem("user_name", res.data.name)
      navigate("/Dashboard")
    } else {
      setError(res.data.message)
    }
  } catch (err) {
    setError("Something went wrong. Try again.")
  }
}

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-sm">

        <h1 className="text-base font-medium text-gray-900 text-center mb-1 ">Venture:AI powered StartUp Architect</h1>
        <p className="text-xs text-gray-400 text-center mb-6">Sign in to your account</p>

        <div className="mb-4">
          <label className="text-xs text-gray-500 mb-1 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 bg-gray-50"
          />
        </div>

        <div className="mb-6">
          <label className="text-xs text-gray-500 mb-1 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 bg-gray-50"
          />
        </div>

        {error && <p className="text-xs text-red-400 mb-4 text-center">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-900 text-sm py-2 rounded-lg transition"
        >
          Login
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <span onClick={() => navigate("/Signup")} className="text-gray-600 cursor-pointer underline">
            Sign up
          </span>
        </p>

      </div>
    </div>
  )
}