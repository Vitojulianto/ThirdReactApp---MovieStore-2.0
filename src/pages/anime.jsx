import React, { useState, useEffect, useContext } from 'react'
import Button from '../components/Button'
import Navbar from '../Fragments/Navbar'
import axios from 'axios'
import AnimeSearch from '../Fragments/AnimeSearch'
import AnimeFilter from '../Fragments/AnimeFilter'
import AnimeCard from '../Fragments/AnimeCard'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
import { toast } from 'react-toastify'


function Anime() {
  const { cart, addToCart } = useContext(CartContext)
 
  
  const [anime, setAnime] = useState([])
  const [search, setSearch] = useState(() => localStorage.getItem("searchTerm") || "")
  const [filter, setFilter] = useState(() => localStorage.getItem("filterType") || "")
  const [currentPage, setCurrentPage] = useState(() => Number(localStorage.getItem("animePage")) || 1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const baseUrl = 'https://api.jikan.moe/v4/anime'
  const fixedPrice = 100000

  const navigate = useNavigate()

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem("searchTerm", search)
  }, [search])

  useEffect(() => {
    localStorage.setItem("filterType", filter)
  }, [filter])

  useEffect(() => {
    localStorage.setItem("animePage", currentPage)
  }, [currentPage])

  const handleBuy = (anime) => {
    addToCart({
      id: anime.mal_id,
      name: anime.title,
      img: anime.images.jpg.image_url,
      price: fixedPrice,
    })
    toast.success(`Added ${anime.title} to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      theme: "colored"
    })
  }

  const fetchAnime = async (currentPage, searchTerm, filterType) => {
    setLoading(true)
    try {
      let url = `${baseUrl}?page=${currentPage}&limit=12`

      if (searchTerm) {
        url = `${baseUrl}?q=${searchTerm}&page=${currentPage}&limit=12`
      } else if (filterType && filterType !== "All") {
        url = `${baseUrl}?genres=${filterType}&page=${currentPage}&limit=12`
      }

      const response = await axios.get(url)
      setAnime(response.data.data)
      setTotalPages(response.data.pagination.last_visible_page)
    } catch (error) {
      console.error('Error fetching anime:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchAnime(currentPage, search, filter)
    }, 500)
    return () => clearTimeout(debounceFetch)
  }, [currentPage, search, filter])

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleSearching = (value) => {
    setSearch(value)
    setFilter("All")
    setCurrentPage(1)
  }

  const handleFilter = (value) => {
    setFilter(value)
    setSearch("")
    setCurrentPage(1)
  }

  const getVisiblePages = () => {
    const maxVisiblePages = 5
    let startPage = Math.max(currentPage - 2, 1)
    let endPage = startPage + maxVisiblePages - 1
    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }

  const handleDetails = (id) => {
    navigate(`/anime/${id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100">
      <Navbar />
      <div className="px-4 py-10 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 drop-shadow-sm animate-bounce">
            🌸 Explore Anime World 🌸
          </h1>
          <p className="text-md text-gray-600 mt-2">
            Discover and buy your favorite anime collections!
          </p>
        </div>

        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <AnimeSearch onSearch={handleSearching} />
          <AnimeFilter onFilter={handleFilter} />
        </div>

        
        {loading ? (
          <div className="text-center text-xl font-semibold py-10">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-8 px-4">
            {anime.map((item) => (
              <AnimeCard key={item.mal_id} className="bg-white shadow-xl rounded-2xl overflow-hidden w-full">
                <img
                  src={item.images.jpg.image_url}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-purple-700 mb-2">{item.title}</h2>
                  
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">{item.synopsis}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-bold">Rp{fixedPrice.toLocaleString('id-ID')}</span>
                    <div className="flex gap-2">
                      <Button className="btn btn-sm btn-info" onClick={() => handleDetails(item.mal_id)}>
                        Details
                      </Button>
                      <Button className="btn btn-sm btn-success" onClick={() => handleBuy(item)}>
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimeCard>
            ))}
          </div>
        )}

        
        <div className="flex justify-center gap-2 mt-10 flex-wrap">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="btn btn-sm"
          >
            Prev
          </button>
          {getVisiblePages().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn btn-sm ${page === currentPage ? 'btn-primary text-white' : 'btn-outline'}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="btn btn-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Anime
