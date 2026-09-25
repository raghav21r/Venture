import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    job_title_or_work: "",
    experience: "",
    core_skills: ""
  })
  const [error, setError]     = useState("")
  const [success, setSuccess] = useState("")
  const navigate              = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSignup = async () => {
    try {
      const payload = {
        ...form,
        experience: form.experience === "" ? null : parseInt(form.experience, 10)
      }
      const res = await axios.post("http://127.0.0.1:8000/Signup", payload)
      if (res.data.status === "Sign Up Completed") {
        setSuccess("Account created!")
        setTimeout(() => navigate("/Login"), 2000)
      }
    } catch (err) {
      setError("Something went wrong. Try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-sm">

        <h1 className="text-base font-medium text-gray-900 text-center mb-1">Venture:AI Powered StartUp Architect</h1>
        <p className="text-xs text-gray-400 text-center mb-6">Create your account</p>

        {["name", "email", "phone_number", "password"].map(field => (
          <div className="mb-4" key={field}>
            <label className="text-xs text-gray-500 mb-1 block capitalize">
              {field.replace("_", " ")}
            </label>
            <input
              name={field}
              type={field === "password" ? "password" : "text"}
              value={form[field]}
              onChange={handleChange}
              placeholder={
                field === "email" ? "you@example.com" :
                field === "phone_number" ? "+91 9876543210" :
                field === "password" ? "••••••••" : "Raghav Singh"
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 bg-gray-50"
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="text-xs text-gray-500 mb-1 block">Job title / What you currently do</label>
          <input
            name="job_title_or_work"
            type="text"
            value={form.job_title_or_work}
            onChange={handleChange}
            placeholder="e.g. Software Engineer, Student, Freelancer"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 bg-gray-50"
          />
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-500 mb-1 block">Years of experience</label>
          <input
            name="experience"
            type="number"
            min="0"
            value={form.experience}
            onChange={handleChange}
            placeholder="e.g. 3"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 bg-gray-50"
          />
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-500 mb-1 block">Core skills</label>
          <input
            name="core_skills"
            type="text"
            value={form.core_skills}
            onChange={handleChange}
            placeholder="e.g. Python, Product Management, Sales"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 bg-gray-50"
          />
        </div>

        {error   && <p className="text-xs text-red-400 mb-3 text-center">{error}</p>}
        {success && <p className="text-xs text-green-500 mb-3 text-center">{success}</p>}

        <button
          onClick={handleSignup}
          className="w-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-900 text-sm py-2 rounded-lg transition mt-2"
        >
          Create account
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <span onClick={() => navigate("/Login")} className="text-gray-600 cursor-pointer underline">
            Login
          </span>
        </p>

      </div>
    </div>
  )
}