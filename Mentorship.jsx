import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Mentorship() {
  const navigate = useNavigate()
  const email    = localStorage.getItem("user_email")
  const name     = localStorage.getItem("user_name")

  const [experts,      setExperts]      = useState([])
  const [selected,     setSelected]     = useState(null)
  const [booking,      setBooking]      = useState({ date: "", time_slot: "" })
  const [appointments, setAppointments] = useState([])
  const [tab,          setTab]          = useState("experts")
  const [success,      setSuccess]      = useState("")
  const [error,        setError]        = useState("")
  const [loading,      setLoading]      = useState(false)

  const [mentorForm, setMentorForm] = useState({
    name: "", advisor_mail: "", phone_number: "", bio: "", domain: "" ,date: "", time_slot: ""
  })
  const [mentorSuccess, setMentorSuccess] = useState("")
  const [mentorError,   setMentorError]   = useState("")
  const [mentorLoading, setMentorLoading] = useState(false)

  useEffect(() => {
    if (!email) navigate("/")
    axios.get("http://127.0.0.1:8000/Mentorship/Experts")
      .then(res => setExperts(Array.isArray(res.data) ? res.data : [res.data]))
      .catch(() => setExperts([]))
    axios.get(`http://127.0.0.1:8000/Mentorship/appointment/?user_email=${email}`)
      .then(res => setAppointments(res.data))
      .catch(() => setAppointments([]))
  }, [])

  const handleBook = async () => {
    if (!selected) return
    setLoading(true)
    setError("")
    try {
      await axios.post("http://127.0.0.1:8000/Mentorship/book", {
        user_name    : name,
        user_mail    : email,
        advisor_mail : selected.mail,
        phone_number : selected.phone_number,
        name         : selected.name,
        bio          : selected.bio,
        domain       : selected.domain,
        date         : booking.date,
        time_slot    : booking.time_slot,
      })
      setSuccess("Appointment request sent! Expert will confirm shortly.")
      setTab("appointments")
      const res = await axios.get(
        `http://127.0.0.1:8000/Mentorship/appointment/?user_email=${email}`
      )
      setAppointments(res.data)
    } catch {
      setError("Something went wrong. Try again.")
    }
    setLoading(false)
  }

  const handleRegisterMentor = async () => {
    setMentorLoading(true)
    setMentorError("")
    try {
      const res = await axios.post("http://127.0.0.1:8000/Mentorship", mentorForm)
      setMentorSuccess(`Welcome ${res.data.name}! You are now registered as a mentor.`)
      setMentorForm({ name: "", advisor_mail: "", phone_number: "", bio: "", domain: "", date: "", time_slot: "" })
      // Refresh experts list
      const experts = await axios.get("http://127.0.0.1:8000/Mentorship/Experts")
      setExperts(Array.isArray(experts.data) ? experts.data : [experts.data])
    } catch {
      setMentorError("Something went wrong. Try again.")
    }
    setMentorLoading(false)
  }

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

        <h2 className="text-base font-medium text-gray-900 mb-1">Mentorship</h2>
        <p className="text-xs text-gray-400 mb-6">Connect with industry experts</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {[
            { key: "experts",      label: "Experts"             },
            { key: "book",         label: "Book appointment"    },
            { key: "appointments", label: "My appointments"     },
            { key: "register",     label: "Register as mentor"  },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`text-xs px-4 py-2 transition ${
                tab === t.key
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Experts Tab ── */}
        {tab === "experts" && (
          <div className="grid grid-cols-3 gap-4">
            {experts.length === 0 ? (
              <p className="text-xs text-gray-400">No experts available yet.</p>
            ) : experts.map((expert, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 mb-3">
                  {expert.name?.charAt(0).toUpperCase()}
                </div>
                <p className="text-sm font-medium text-gray-900">{expert.name}</p>
                <p className="text-xs text-gray-400 mt-1">{expert.domain}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-3">
                  {expert.bio}
                </p>
                <button
                  onClick={() => { setSelected(expert); setTab("book") }}
                  className="mt-4 w-full border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs py-2 rounded-lg transition"
                >
                  Book appointment
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── Book Tab ── */}
        {tab === "book" && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md">
            {!selected ? (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  No expert selected. Please choose one first.
                </p>
                <button
                  onClick={() => setTab("experts")}
                  className="text-xs text-gray-500 underline"
                >
                  Browse experts
                </button>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Book with {selected.name}
                </p>
                <p className="text-xs text-gray-400 mb-6">{selected.domain}</p>

                <div className="mb-4">
                  <label className="text-xs text-gray-500 mb-1 block">Date</label>
                  <input
                    type="date"
                    value={booking.date}
                    onChange={e => setBooking({ ...booking, date: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none bg-gray-50"
                  />
                </div>

                <div className="mb-6">
                  <label className="text-xs text-gray-500 mb-1 block">Time slot</label>
                  <select
                    value={booking.time_slot}
                    onChange={e => setBooking({ ...booking, time_slot: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none bg-gray-50"
                  >
                    <option value="">Select a time</option>
                    {[
                      "9:00 AM", "10:00 AM", "11:00 AM",
                      "12:00 PM", "2:00 PM",  "3:00 PM",
                      "4:00 PM", "5:00 PM"
                    ].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {error   && <p className="text-xs text-red-400 mb-3">{error}</p>}
                {success && <p className="text-xs text-green-500 mb-3">{success}</p>}

                <button
                  onClick={handleBook}
                  disabled={loading || !booking.date || !booking.time_slot}
                  className="w-full border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 text-sm py-2 rounded-lg transition"
                >
                  {loading ? "Booking..." : "Send appointment request"}
                </button>
              </>
            )}
          </div>
        )}

        {/* ── Appointments Tab ── */}
        {tab === "appointments" && (
          <div className="space-y-3">
            {appointments.length === 0 ? (
              <p className="text-xs text-gray-400">No appointments yet.</p>
            ) : appointments.map((apt, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-5 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{apt.mentor_name}</p>
                  <p className="text-xs text-gray-400 mt-1">{apt.domain}</p>
                  <p className="text-xs text-gray-500 mt-1">{apt.date}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-400">
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ── Register as Mentor Tab ── */}
        {tab === "register" && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Register as a mentor
            </p>
            <p className="text-xs text-gray-400 mb-6">
              Share your expertise with aspiring entrepreneurs
            </p>

            {[
              { name: "name",         label: "Full name",        placeholder: "John Doe"           },
              { name: "advisor_mail", label: "Email",            placeholder: "you@example.com"    },
              { name: "phone_number", label: "Phone number",     placeholder: "+91 9876543210"     },
              { name: "domain",       label: "Domain/expertise", placeholder: "e.g. Fintech, Law"  },
            ].map(field => (
              <div className="mb-4" key={field.name}>
                <label className="text-xs text-gray-500 mb-1 block">{field.label}</label>
                <input
                  name={field.name}
                  value={mentorForm[field.name]}
                  onChange={e => setMentorForm({ ...mentorForm, [e.target.name]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none bg-gray-50"
                />
              </div>
            ))}

            <div className="mb-6">
              <label className="text-xs text-gray-500 mb-1 block">Bio</label>
              <textarea
                name="bio"
                value={mentorForm.bio}
                onChange={e => setMentorForm({ ...mentorForm, bio: e.target.value })}
                placeholder="Describe your experience and expertise..."
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none bg-gray-50 resize-none"
              />
            </div>

            {mentorError   && <p className="text-xs text-red-400 mb-3">{mentorError}</p>}
            {mentorSuccess && <p className="text-xs text-green-500 mb-3">{mentorSuccess}</p>}

            <button
              onClick={handleRegisterMentor}
              disabled={mentorLoading}
              className="w-full border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 text-sm py-2 rounded-lg transition"
            >
              {mentorLoading ? "Registering..." : "Register as mentor"}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}