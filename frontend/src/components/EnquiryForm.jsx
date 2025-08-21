import { useState } from 'react'

export default function EnquiryForm({ pkg, onClose }) {
    const [form, setForm] = useState({ name: '', email: '', msg: '' })
    const [errors, setErrors] = useState([])

    const handleSubmit = async () => {
        const res = await fetch('http://localhost:4000/enquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                package_id: pkg._id || pkg.id,
                user_name: form.name,
                user_email: form.email,
                message: form.msg
            })
        })

        if (!res.ok) {
            const data = await res.json()
            if (data.errors) {
                setErrors(data.errors)
                return
            }
            alert('Something went wrong!')
            return
        }

        alert('Enquiry submitted!')
        setForm({ name: '', email: '', msg: '' })
        setErrors([])
        onClose()
    }

    return (
        <div className="mt-4 border p-4 rounded">
            <h3 className="text-lg font-bold mb-2">Enquire: {pkg.package_name}</h3>

            {errors.length > 0 && (
                <ul className="text-red-600 mb-2">
                    {errors.map((err, idx) => (
                        <li key={idx}>{err.msg}</li>
                    ))}
                </ul>
            )}

            <input
                placeholder="Name"
                className="border p-2 mb-2 w-full"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
                placeholder="Email"
                className="border p-2 mb-2 w-full"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <textarea
                placeholder="Message"
                className="border p-2 mb-2 w-full"
                value={form.msg}
                onChange={e => setForm({ ...form, msg: e.target.value })}
            />
            <div className="flex gap-2">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
