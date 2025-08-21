export default function Results({ data, onEnquire }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Treatments</h2>
            <ul className="mb-4 list-disc pl-5">
                {data.treatments.map(t => <li key={t.id}>{t.name}</li>)}
            </ul>

            <h2 className="text-xl font-semibold mb-2">Packages</h2>
            <div className="space-y-2">
                {data.packages.map(p => (
                    <div key={p.id} className="border p-3 flex justify-between">
                        <div>
                            <p className="font-bold">{p.package_name}</p>
                            <p>{p.clinic_name} - ${p.price}</p>
                        </div>
                        <button onClick={() => onEnquire(p)} className="bg-green-500 text-white px-3">Enquire</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
