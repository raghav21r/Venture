import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
export default function Chatbot() {
    const navigate = useNavigate();
    const email = localStorage.getItem('user_email');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);
    useEffect(() => {
        if (!email) navigate('/')
        axios.get('http://127.0.0.1:8000/Chatbot/history?user_email=${email}')
            .then(res => {
                const history = res.data.flatMap(h => [
                    { role: 'user', text: h.user },
                    { role: 'ai', text: h.ai }
                ])
                setMessages(history)
            })

    }, [])
    useEffect(() => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [messages])
    const handleSend = async () => {
        if (!input.trim()) return
        const userMessage = input
        setInput("")
        setMessages(prev => [...prev, { role: 'user', text: userMessage }])
        setLoading(true)
        try {
            const res = await axios.post('http://127.0.0.1:8000/Chatbot', {
                prompts: userMessage, user_email: email
            })
            setMessages(prev => [...prev, { role: 'ai', text: res.data.response }])
        } catch {
            setMessages(prev => [...prev, { role: 'ai', text: 'Something went wrong.Try again' }])
        }
        setLoading(false)
    }
    const handleKeyDown = e => {
        if (e.key === 'Enter' && !e.shiftkey) {
            e.preventDefault()
            handleSend()
        }
    }
    const Sidebar = () => {
        return (
        <div className="w-48 border-r border-gray-200 bg-gray-50 p-4 flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-900 pb-4 mb-2 border-b border-gray-200">Venture:AI Powered StartUp Architect</p>
            {[
                { label: 'Profile', path: '/profile' },
                { label: 'Dashboard', path: '/dashboard' },
                { label: 'Launchpad', path: '/launchpad' },
                { label: "Scaling", path: "/scaling" },
                { label: 'Chatbot', path: '/chatbot' },
                { label: 'Mentorship', path: '/mentorship' },
            ].map(item => (
                <button key={item.path}
                    onClick={() => navigate(item.path)}
                    className="text-left text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                >
                    {item.label}
                </button>
            ))}
            <button onClick={() => { localStorage.clear(); navigate('/') }}
                className="mt-auto text-left text-sm text-gray-400 hover:text-gray-600 px-3 py-2 rounded-lg transition"
            >
                Logout
            </button>
        </div>
        )
    }
    return (
        <div className='min-h-screen bg-gray-50 flex'>
            <Sidebar />
            <div className='flex-1 flex flex-col p-8'>
                <h2 className='text-base font-medium text-gray-900 mb-1'>Venture</h2>
                <p className='text-xs text-gray-400 mb-6'>Ask anything about your startup</p>
                <div className='flex-1 bg-white border border-gray-200 rounded-x1 p-5 overflow-y-auto mb-4 min-h-96 max-h-[500px]'>
                    {messages.lenght === 0 ? (
                        <p className='text-xs text-gray-400 text-center mt-8'>
                            No messages yet.Start a conversation
                        </p>
                    ) : (
                        messages.map((msg, i) => (
                            <div key={i}
                                className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`px-4 py-2 rounded-xl text-sm border ${msg.role === 'user' ? 'max-w-xs bg-gray-100 border-gray-200 text-gray-900' :
                                        'max-w-2xl bg-white border-gray-200 text-gray-700'
                                    }`}>
                                    {msg.role === 'ai' ? (
                                        <div className="prose prose-sm max-w-none">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                                        </div>
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                    {loading && (
                        <div className='flex justify-start mb-4'>
                            <div className='px-4 py-2 rounded-xl text-sm border border-gray-200 text-gray-400'>
                                Thinking...
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
                <div className='bg-white border border-gray-200 rounded-xl flex items-center gap-3 px-4 py-3'>
                    <input value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder='Type a message'
                        className='flex-1 text-sm text-gray-900 outline-none bg-transparent'
                    />
                    <button onClick={handleSend} disabled={loading} className='border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs px-4 py-2 rounded-lg transition'>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}