import { useState } from 'react'
import Search from './components/Search'
import Results from './components/Results'
import EnquiryForm from './components/EnquiryForm'

export default function App() {
  const [data, setData] = useState(null)
  const [selectedPkg, setSelectedPkg] = useState(null)

  return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Cosma Beauty</h1>
        <Search setData={setData} />
        {data && <Results data={data} onEnquire={setSelectedPkg} />}
        {selectedPkg && <EnquiryForm pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />}
      </div>
  )
}
