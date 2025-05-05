import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Fragments/Navbar';

function HomePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const ids = [1, 5114, 30276]; 
      const responses = await Promise.all(
        ids.map((id) =>
          fetch(`https://api.jikan.moe/v4/anime/${id}`).then((res) => res.json())
        )
      );
      const data = responses.map((res) => res.data);
      setFavorites(data);
    };

    fetchFavorites();
  }, []);

  return (
    <>
    <Navbar />
    <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-screen text-gray-800">
      
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 py-12 max-w-7xl mx-auto">
        
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold text-pink-600">Welcome to AnimeVerse 🌸</h1>
          <p className="text-lg lg:text-xl text-gray-700">
            Explore your favorite anime, characters, and collections with a touch of magic! ✨
          </p>
          <Link to="/anime">
            <button className="mt-4 px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition shadow-lg">
              Start Exploring
            </button>
          </Link>
        </div>

        {/* Right: Favorite Anime */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 text-center">
          <h3 className="font-semibold text-purple-600 text-xl mb-4">🌟 Favorite Anime</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favorites.map((anime) => (
              <div
                key={anime.mal_id}
                className="bg-white p-3 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
              >
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-40 object-cover rounded-lg mb-2"s
                />
                <p className="text-sm font-medium text-gray-800">{anime.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-12 bg-white rounded-t-3xl shadow-inner mt-12">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-purple-100 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">🔍 Search Anime</h3>
            <p>Quickly find anime by title and explore detailed info.</p>
          </div>
          <div className="p-6 bg-blue-100 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">❤️ Favorite</h3>
            <p>Save your favorite anime and characters to your collection.</p>
          </div>
          <div className="p-6 bg-pink-100 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">🧩 Filter by Type</h3>
            <p>Sort anime based on genre or type to match your taste.</p>
          </div>
          <div className="p-6 bg-yellow-100 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">🛒 Smart Cart</h3>
            <p>Add anime figures to your cart and prepare for checkout.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-600">Ready to dive into the Anime World?</h2>
        <p className="text-gray-700 mt-2">Start searching, saving, and shopping your favorite anime now!</p>
        <Link to="/anime">
          <button className="mt-6 px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition shadow-lg">
            Go to Anime List
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-16 py-6">
        © {new Date().getFullYear()} AnimeVerse. All rights reserved. | Made with ❤️ by Vit
      </footer>
    </div>
    </>
  );
}

export default HomePage;
