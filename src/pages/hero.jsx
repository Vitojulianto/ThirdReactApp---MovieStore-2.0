import React from 'react';
import Button from '../components/Button';
import Navbar from '../Fragments/Navbar';
import { useNavigate } from 'react-router-dom';
function Hero() {
    const navigate=useNavigate()

    const handleOnClick = () => {
        navigate('/login')
    }
  return (
    <div>
        <Navbar />
      <div
        className="hero min-h-screen w-full relative"
        style={{
          backgroundImage: "url(/images/herobg.jpg)",
          
          
        }}
      >
        
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md border-2 border-primary bg-black opacity-80 p-10 rounded-lg shadow-lg">
            <h1 className="mb-5 text-5xl font-bold text-black-700">
              Discover & Collect Your Favorite Anime Movies!
            </h1>
            <p className="mb-5">
              Explore an epic collection of anime classics and new releases. Buy,
              collect, and relive your favorite moments!
            </p>
            <Button className="btn btn-primary" onClick={handleOnClick} >Get Started</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
