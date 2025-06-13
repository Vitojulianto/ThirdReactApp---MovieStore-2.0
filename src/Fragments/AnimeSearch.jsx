import React, { useState } from 'react'
import Input from '../components/Input'

function AnimeSearch({ onSearch }) {
  const [input, setInput] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setInput(value)
    onSearch(value)
  }

  return (
    <div className="w-full md:w-1/2">
      <Input
        type="text"
        placeholder="🔍 Search your favorite anime..."
        className="w-full px-4 py-2 border border-pink-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 text-black"
        value={input}
        onChange={handleChange}
      />
    </div>
  )
}

export default AnimeSearch
