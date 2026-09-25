import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const navigate = useNavigate()
  const email    = localStorage.getItem("user_email")

  const [profile, setProfile] = useState(null)
  const [error,   setError]   = useState("")

  useEffect(() => {
    if (!email) navigate("/")
    axios.get(`http://127.0.0.1:8000/Profile/${email}`)
      .then(res => {
        if (res.data.message) {
          setError(res.data.message)
        } else {
          setProfile(res.data)
        }
      })
      .catch(() => setError("Could not load profile."))
  }, [])

  const Sidebar = () => (
    <div className="w-48 border-r border-gray-200 bg-gray-50 p-4 flex flex-col gap-1">
      <p className="text-sm font-medium text-gray-900 pb-4 mb-2 border-b border-gray-200">Venture:AI Powered StartUp Architect</p>
      {[
        { label: "Dashboard",  path: "/dashboard"  },
        { label: "Launchpad",  path: "/launchpad"  },
        { label: "Scaling",    path: "/scaling"    },
        { label: "Chatbot",    path: "/chatbot"    },
        { label: "Mentorship", path: "/mentorship" },
        { label: "Profile",    path: "/profile"    },
      ].map(item => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className="text-left text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
        >
          {item.label}
        </button>
      ))}
      <button
        onClick={() => { localStorage.clear(); navigate("/") }}
        className="mt-auto text-left text-sm text-gray-400 hover:text-gray-600 px-3 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 p-8">

        <h2 className="text-base font-medium text-gray-900 mb-1">Profile</h2>
        <p className="text-xs text-gray-400 mb-8">Your account details</p>

        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}

        {profile && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md">

            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-lg font-medium text-gray-600 mb-6">
              {profile.name?.charAt(0).toUpperCase()}
            </div>

            {/* Fields */}
            {[
              { label: "Full name",     value: profile.name           },
              { label: "Email",         value: profile.email          },
              { label: "Phone number",  value: profile["Phone Number"]},
            ].map(field => (
              <div key={field.label} className="py-3 border-b border-gray-100 last:border-0">
                <p className="text-xs text-gray-400 mb-1">{field.label}</p>
                <p className="text-sm text-gray-900">{field.value}</p>
              </div>
            ))}

            {/* Logout */}
            <button
              onClick={() => { localStorage.clear(); navigate("/") }}
              className="mt-6 w-full border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm py-2 rounded-lg transition"
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </div>
  )
}