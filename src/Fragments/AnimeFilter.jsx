import React, { useEffect, useState } from 'react'
import axios from 'axios'
function AnimeFilter({onFilter}) {
    const [genres, setGenres] = useState([])
    useEffect(() => {
    const fetchGenres = async () => {
            const response = await axios.get('https://api.jikan.moe/v4/genres/anime')
            setGenres(response.data.data)
            }
            fetchGenres()
        },[])
    
  return (
    <div>
      <div className='p-2'>
      <select onChange={(e) => onFilter(e.target.value)} className='border px-2 py-1 rounded text-black-500'>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.mal_id} value={genre.mal_id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
    </div>
  )
}

export default AnimeFilter
