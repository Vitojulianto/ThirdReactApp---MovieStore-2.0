import React, { useContext } from 'react'
import Button from '../components/Button' 



function AnimeCard({ children }) {
 
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 w-full max-w-sm">
      {children}
    </div>
  )
}

const Header = ({ src, alt }) => (
  <figure>
    <img src={src} alt={alt} className="w-full h-64 object-cover" />
  </figure>
)

const Body = ({ title, desc, anime }) => {
  
  <div className="p-4">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    
    <p className="text-sm text-gray-600 line-clamp-3">{desc}</p>
  </div>
}

const Footer = ({ onDetail, onBuy }) => {
  const fixedPrice = 25000

  return (
    <div className="px-4 pb-4 flex justify-between items-center">
      <span className="text-green-600 font-semibold">Rp{fixedPrice.toLocaleString('id-ID')}</span>
      <div className="flex gap-2">
        <Button className="btn btn-sm btn-outline" onClick={onDetail}>
          Details
        </Button>
        <Button className="btn btn-sm btn-primary" onClick={onBuy}>
          Buy Now
        </Button>
      </div>
    </div>
  )
}

AnimeCard.Header = Header
AnimeCard.Body = Body
AnimeCard.Footer = Footer

export default AnimeCard
