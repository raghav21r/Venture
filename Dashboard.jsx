import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// Generic, non-startup-specific rotating messages
const ROTATING_MESSAGES = [
  "Good things take time. Keep going.",
  "Remember to take a short break today.",
  "Small steps every day add up to big progress.",
  "Stay curious. Stay consistent.",
  "A cup of coffee and a clear plan can go a long way.",
  "Momentum builds one decision at a time.",
  "Take a deep breath — you're doing fine.",
  "Great things are built quietly, one day at a time.",
]

const TYPE_SPEED    = 45   // ms per character while typing
const DELETE_SPEED  = 25   // ms per character while deleting
const HOLD_TIME     = 1800 // ms to hold full text before deleting

export default function Dashboard() {
  const navigate = useNavigate()
  const email    = localStorage.getItem('user_email')
  const name     = localStorage.getItem('user_name')

  const [roadmap,    setRoadmap]    = useState(null)
  const [scaling,    setScaling]    = useState(null)
  const [msgIndex,   setMsgIndex]   = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [phase,      setPhase]      = useState("typing") // 'typing' | 'holding' | 'deleting'

  useEffect(() => {
    if (!email) navigate('/')

    axios.get(`http://127.0.0.1:8000/Launchpad?email=${email}`)
      .then(res => setRoadmap(res.data))
      .catch(() => setRoadmap(null))

    axios.get(`http://127.0.0.1:8000/ScalingEngine?user_email=${email}`)
      .then(res => setScaling(res.data))
      .catch(() => setScaling(null))
  }, [])

  // Typewriter effect: type out -> hold -> delete -> move to next message
  useEffect(() => {
    const currentMessage = ROTATING_MESSAGES[msgIndex]

    if (phase === "typing") {
      if (displayText.length < currentMessage.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentMessage.slice(0, displayText.length + 1))
        }, TYPE_SPEED)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => setPhase("deleting"), HOLD_TIME)
        return () => clearTimeout(timeout)
      }
    }

    if (phase === "deleting") {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, DELETE_SPEED)
        return () => clearTimeout(timeout)
      } else {
        setMsgIndex(prev => (prev + 1) % ROTATING_MESSAGES.length)
        setPhase("typing")
      }
    }
  }, [displayText, phase, msgIndex])

  const Sidebar = () => (
    <div className="w-48 border-r border-gray-200 bg-gray-50 p-4 flex flex-col gap-1">
      <p className="text-sm font-medium text-gray-900 pb-4 mb-2 border-b border-gray-200">
        VentureAI
      </p>
      {[
        { label: 'Profile',    path: '/Profile'    },
        { label: 'Dashboard',  path: '/Dashboard'  },
        { label: 'Launchpad',  path: '/Launchpad'  },
        { label: 'Scaling',    path: '/scaling'    },
        { label: 'Chatbot',    path: '/Chatbot'    },
        { label: 'Mentorship', path: '/Mentorship' },
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
        onClick={() => { localStorage.clear(); navigate('/') }}
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

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-base font-medium text-gray-900">Welcome back, {name}</h2>
            <p className="text-xs text-gray-400 mt-1">Here is your startup overview</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
            {name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Typewriter message (replaces stats + recent conversations) */}
        <div className="flex items-center justify-center min-h-[200px] mb-6 px-4">
          <p className="text-3xl font-medium text-gray-800 text-center leading-snug">
            {displayText}
            <span className="inline-block w-[2px] h-8 bg-gray-800 ml-1 align-middle animate-pulse" />
          </p>
        </div>

        {/* Quick actions — untouched */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm font-medium text-gray-900 mb-4">Quick actions</p>
          <div className="flex gap-3">
            {[
              { label: 'Launchpad',       path: '/launchpad'  },
              { label: 'Book a mentor',   path: '/mentorship' },
              { label: 'Open chatbot',    path: '/chatbot'    },
              { label: 'Scaling engine',  path: '/scaling'    },
            ].map(a => (
              <button
                key={a.path}
                onClick={() => navigate(a.path)}
                className="flex-1 border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs py-2 rounded-lg transition"
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
