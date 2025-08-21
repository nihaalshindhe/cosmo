import { useState } from 'react'

export default function Search({ setData }) {
    const [text, setText] = useState('')

    const handleSearch = async () => {
        const res = await fetch(`http://localhost:4000/search?concern=${text}`)
        const json = await res.json()
        setData(json)
    }

    return (
        <div className="flex gap-2 mb-4">
            <input value={text} onChange={e => setText(e.target.value)} placeholder="Enter your skin/hair concern..." className="border p-2 flex-1" />
            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">Search</button>
        </div>
    )
}
