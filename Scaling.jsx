import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Scaling(){
    const navigate=useNavigate()
    const email=localStorage.getItem('user_email');
    const [stage,setStage]=useState('');
    const [mrr,setMrr]=useState('');
    const [state,setState]=useState('');
    const [result,setResult]=useState(null);
    const [step,setStep]=useState(1);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    const stages=[
        {label:'Pre Revenue',value:'pre_revenue'},
        {label:'Early Revenue',value:'early_revenue'},
        {label:'Scaling',value:'scaling'}
    ]
    const handleStage=async ()=>{
        setLoading(true);
        setError('')
        try{
            await axios.post('http://127.0.0.1:8000/SetStage',{
                mail:email,
                stage:stage,
                current_mrr:mrr,
                state_of_company:state
            })
            const res = await axios.post(`http://127.0.0.1:8000/ScalingEngine?user_email=${email}`)
            setResult(res.data)
            setStep(2)
        }catch{
            setError("Something went wrong.Try again")
        }
        setLoading(false)
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
                <h2 className="text-base font-medium text-gray-900 mb-1">Scaling Engine</h2>
                <p className="text-xs text-gray-400 mb-8">Get a roadmap to scale your startup</p>
                {step===1?(
                    <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md">
                        <p className="text-sm font-medium text-gray-900 mb-4">Set Your stage</p>
                        <div className="mb-4">
                            <label className="text-xs text-gray-500 mb-2 block">Current stage</label>
                            <div className="grid grid-cols-3 gap-2">
                                {stages.map(s=>(
                                    <button key={s.value} onClick={()=>setStage(s.value)}
                                            className={`text-xs py-2 px-3 rounded-lg border transition ${
                                                stage===s.value ? "border-gray-400 bg-gray-100 text-gray-900":
                                                "border-gray-200 bg-gray-50 text-gray-500"
                                            }`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="text-xs text-gray-500 mb-1 block">Current MRR (₹)</label>
                            <input value={mrr} onChange={e=>setMrr(e.target.value)} placeholder='e.g.10000'
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none bg-gray-50"/>
                        </div>
                        <div className="mb-6">
                            <label className="text-xs text-gray-500 mb-1 block">State of company</label>
                            <textarea value={state} onChange={e=>setState(e.target.value)}
                                placeholder="tell me about your company at what stage is it right now.." rows={3}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none bg-gray-50 resize-none"/>
                        </div>
                        {error && <p className="text-xs text-red-400 mb-3">{error}</p>}
                        <button onClick={handleStage} disabled={loading || !stage} className="w-full border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 text-sm py-2 rounded-lg transition">
                            {loading ? "Generating...":'Generate scaling roadmap'}
                        </button>
                    </div>
                ):(
                    <div className="space-y-4">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <p className="text-xs text-gray-400 mb-2">This quarter's priority</p>
                            <p className="text-sm text-gray-900 font-medium leading-relaxed">{result.priority}</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <p className="text-sm font-medium text-gray-900 mb-4">Scaling roadmap</p>
                            {Array.isArray(result.roadmap) && result.roadmap.length>0?(
                                <div className="space-y-3">
                                    {result.roadmap.map((item, i) => (
                                        <div key={i} className="py-3 border-b border-gray-100 last:border-0">
                                            <p className="text-xs text-gray-400 mb-1">{item.milestone || `Step ${i+1}`}</p>
                                            <p className="text-sm text-gray-700">{item.action}</p>
                                        </div>
                                    ))}
                                </div>
                            ):(
                                <p className="text-sm text-gray-700">{result.roadmap}</p>
                            )}
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <p className="text-xs text-gray-400 mb-2">Funding recommendation</p>
                            <p className="text-sm text-gray-700 leading-relaxed">{result.funding_recommendation}</p>
                        </div>

                        <button onClick={()=>{setStep(1);setResult(null);setStage("")}} 
                                className="border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs px-4 py-2 rounded-lg transition">
                            Update Stage
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
