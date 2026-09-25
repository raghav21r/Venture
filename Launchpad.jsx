import { useState,useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Launchpad() {
  const navigate = useNavigate()
  const email    = localStorage.getItem("user_email")

  const [form, setForm] = useState({
    startup_idea: "", industry_sector: "", experience: "", investment: "",monthly_savings:"",monthly_income:"",
    monthly_expenses:"",stage:"",
  })
  const [skills,       setSkills]       = useState("")
  const [result,       setResult]       = useState(null)
  const [sideHustles,  setSideHustles]  = useState(null)
  const [loading,      setLoading]      = useState(false)
  const [hustleLoad,   setHustleLoad]   = useState(false)
  const [error,        setError]        = useState("")
  const [showHustle,   setShowHustle]   = useState(false)
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  useEffect(()=>{
    const email=localStorage.getItem("user_email")
    if (email){
      setForm(prev=>({ ...prev,mail:email}))
    }
  },[])
  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await axios.post("http://127.0.0.1:8000/Launchpad", {
        ...form, mail: email
      })
      setResult(res.data)
    } catch {
      setError("Something went wrong. Try again.")
    }
    setLoading(false)
  }

  const handleSideHustle = async () => {
    setHustleLoad(true)
    try {
      const res = await axios.post("http://127.0.0.1:8000/SideHustle", {
        core_skills     : skills,
        experience : form.experience,
        mail       : form.mail
      })
      setSideHustles(res.data.side_hustle)
    } catch {
      setError("Side hustle fetch failed.")
    }
    setHustleLoad(false)
  }

  const Sidebar=()=>{
        return <div className="w-48 border-r border-gray-200 bg-gray-50 p-4 flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-900 pb-4 mb-2 border-b border-gray-200">Venture:AI Powered StartUp Architect</p>
            {[
                    {label:'Profile',path:'/profile'},
                    {label:'Dashboard',path:'/dashboard'},
                    {label:'Launchpad',path:'/launchpad'},
                    {label: "Scaling",path: "/scaling"},
                    {label:'Chatbot',path:'/chatbot'},
                    {label:'Mentorship',path:'/mentorship'},
                ].map(item=>(
                    <button key={item.path}
                            onClick={()=>navigate(item.path)}
                            className="text-left text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                    >
                        {item.label}
                    </button>
                    ))}
                    <button onClick={()=>{localStorage.clear();navigate('/')}}
                            className="mt-auto text-left text-sm text-gray-400 hover:text-gray-600 px-3 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>
        </div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 p-8">

        <h2 className="text-base font-medium text-gray-900 mb-1">Launchpad</h2>
        <p className="text-xs text-gray-400 mb-8">Enter your startup details to generate a roadmap</p>

        <div className="grid grid-cols-2 gap-6 mb-6">

          {/* Input Form */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm font-medium text-gray-900 mb-4">Startup details</p>

            <div className="mb-4">
              <label className="text-xs text-gray-500 mb-1 block">Startup idea</label>
              <textarea
                name="startup_idea"
                value={form.startup_idea}
                onChange={handleChange}
                placeholder="Describe your startup idea..."
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none bg-gray-50 resize-none"
              />
            </div>

            <div className="mb-4">
              <label className="text-xs text-gray-500 mb-1 block">Sector</label>
              <input
                name="industry_sector"
                value={form.industry_sector}
                onChange={handleChange}
                placeholder="e.g. Fintech, Edtech"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none bg-gray-50"
              />
            </div>
            <div className="mb-4">
              <label className="text-xs text-gray-500 mb-1 block">Monthly Income</label>
              <input
                name="monthly_income"
                value={form.monthly_income}
                onChange={handleChange}
                placeholder="e.g. 50000"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none bg-gray-50"
              />
            </div>
            <div className="mb-6">
              <label className="text-xs text-gray-500 mb-1 block">Monthly Savings</label>
              <input
                name="monthly_savings"
                value={form.monthly_savings}
                onChange={handleChange}
                placeholder="e.g. 500000"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none bg-gray-50"
              />
            </div>
            <div className="mb-6">
              <label className="text-xs text-gray-500 mb-1 block">How Much do you spend monthly</label>
              <input
                name="monthly_expenses"
                value={form.monthly_expenses}
                onChange={handleChange}
                placeholder="e.g. 500000"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none bg-gray-50"
              />
            </div>
            <div className="mb-6">
              <label className="text-xs text-gray-500 mb-1 block">Your Investment</label>
              <input
                name="investment"
                value={form.investment}
                onChange={handleChange}
                placeholder="e.g. 500000"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none bg-gray-50"
              />
            </div>
            {error && <p className="text-xs text-red-400 mb-3">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 text-sm py-2 rounded-lg transition"
            >
              {loading ? "Generating..." : "Generate roadmap"}
            </button>
          </div>

          {/* Result */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm font-medium text-gray-900 mb-4">Your roadmap</p>
            {!result ? (
              <p className="text-xs text-gray-400">
                Fill in your details and click "Generate roadmap" to see results here.
              </p>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-96">
                {Object.entries(result).map(([key, value]) => (
                  <div key={key} className="py-3 border-b border-gray-100 last:border-0">
                    <p className="text-xs text-gray-400 mb-1 capitalize">
                      {key.replace(/_/g, " ")}
                    </p>
                    <p className="text-sm text-gray-700">
                      {typeof value === "object" ? JSON.stringify(value) : value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Side Hustle — Optional Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">

          {/* Toggle header */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowHustle(!showHustle)}
          >
            <div>
              <p className="text-sm font-medium text-gray-900">Side hustle suggestions</p>
              <p className="text-xs text-gray-400 mt-1">
                Optional — get AI-powered side hustle ideas based on your skills
              </p>
            </div>
            <span className="text-xs text-gray-400">{showHustle ? "▲ Hide" : "▼ Show"}</span>
          </div>

          {/* Expandable content */}
          {showHustle && (
            <div className="mt-6">
              <div className="mb-4">
                <label className="text-xs text-gray-500 mb-1 block">Your skills</label>
                <input
                  value={skills}
                  onChange={e => setSkills(e.target.value)}
                  placeholder="e.g. Python, Marketing, Design"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none bg-gray-50"
                />
                <label className="text-xs text-gray-500 mb-1 block">Experience (In Months)</label>
                <input
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="e.g. 2 years"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none bg-gray-50"
              />
              </div>

              <button
                onClick={handleSideHustle}
                disabled={hustleLoad}
                className="border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 text-sm px-6 py-2 rounded-lg transition mb-6"
              >
                {hustleLoad ? "Fetching..." : "Get suggestions"}
              </button>

              {/* Side hustle results */}
              {sideHustles && (
                <div className="grid grid-cols-3 gap-4">
                  {sideHustles.map((hustle, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        {hustle.side_hustle}
                      </p>
                      <p className="text-xs text-gray-400">{hustle.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}