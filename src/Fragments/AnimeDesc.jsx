import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';

export default function AnimeDesc() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      const [animeRes, characterRes] = await Promise.all([
        axios.get(`https://api.jikan.moe/v4/anime/${id}`),
        axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`)
      ]);
      setDetail(animeRes.data.data);
      setCharacters(characterRes.data.data);
    };
    fetchAnimeDetail();
  }, [id]);

  const handleGoBack = () => {
    navigate("/anime");
  };

  if (!detail) return <div className="text-center text-xl text-white py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white px-4 py-8">
      {/* Tombol Go Back */}
      <div className="mb-6">
        <Button 
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
          onClick={handleGoBack}
        >
          ← Go Back
        </Button>
      </div>

      {/* Info Anime */}
      <div className="max-w-4xl mx-auto bg-white text-gray-900 rounded-xl shadow-lg p-6">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-4">{detail.title}</h1>
        <img
          src={detail.images.jpg.large_image_url}
          alt={detail.title}
          className="mx-auto rounded-xl shadow-lg w-full max-w-md"
        />
        <p className="mt-6 text-lg leading-relaxed">{detail.synopsis}</p>

        <div className="mt-4 text-lg space-y-2">
          <p><span className="font-bold text-indigo-600">Rating:</span> {detail.rating}</p>
          <p><span className="font-bold text-indigo-600">Genres:</span> {detail.genres.map((g) => g.name).join(', ')}</p>
          <p><span className="font-bold text-indigo-600">Episodes:</span> {detail.episodes}</p>
        </div>

        {/* Trailer */}
        {detail.trailer?.embed_url && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-center text-indigo-700">Watch Trailer</h3>
            <div className="mt-4 flex justify-center">
              <iframe
                width="100%"
                height="400"
                src={detail.trailer.embed_url}
                title="Trailer"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg shadow-md max-w-2xl"
              />
            </div>
          </div>
        )}
      </div>

      {/* Karakter Anime */}
      <div className="mt-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-pink-400">Characters</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {characters.map((char) => (
            <div key={char.mal_id} className="bg-white text-gray-900 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center">
              <img
                src={char.character.images.jpg.image_url}
                alt={char.character.name}
                className="rounded-full w-28 h-28 mx-auto object-cover border-4 border-indigo-500 mb-4"
              />
              <p className="font-semibold text-lg">{char.character.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
