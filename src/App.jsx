import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import image1 from './assets/HD-wallpaper-anime-couple-school-love-anime-girl-anime-school-love-artist-artwork-digital-art.jpg';
import image2 from './assets/468a1700b5823cab530c91aee6fb001c.webp';
import image3 from './assets/original-992edd0bda8f7fae8a65e0010aa67d61.webp';
import image4 from './assets/5e19ba1af0a06fceccaf98b5ae4ccbfe.webp';
import image5 from './assets/ai-generated-8312453_1280.png';
import yayImage from './assets/yay.webp';

function Heart({ style }) {
  return (
    <div className="heart" style={style}>
      ❤️
    </div>
  );
}

function GalleryPage() {
  const galleryRef = useRef(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  const imageQuotes = [
    {
      image: image1,
      quote: "From stolen glances in the schoolyard, our hearts found a melody only we could hear.",
      color: "#FF6B9E"  // Soft Pink
    },
    {
      image: image2,
      quote: "Through the twists and turns of life, our love grew stronger with each passing season.",
      color: "#4ECDC4"  // Turquoise
    },
    {
      image: image3,
      quote: "With every tiny giggle , we built a world full of love and laughter.",
      color: "#9C27B0"  // Golden Yellow
    },
    {
      image: image4,
      quote: "In the wrinkles of time, our hearts still dance to the rhythm of our first hey.",
      color: "#FFD700"  // Deep Purple
    },
    {
      image: image5,
      quote: "Through every moment, every memory, every dream... will you be my Valentine?",
      color: "#FF4081"  // Bright Pink
    },
    {

      image:yayImage
    }
  ];

  useEffect(() => {
    const gallery = galleryRef.current;
    
    const handleScroll = () => {
      // Calculate exact image index based on scroll position
      const scrollTop = gallery.scrollTop;
      const viewportHeight = window.innerHeight;
      const currentIndex = Math.floor(scrollTop / viewportHeight);
      
      // Update quote index
      setCurrentQuoteIndex(currentIndex);
    };

    const handleWheel = (e) => {
      e.preventDefault();
      gallery.scrollBy({
        top: e.deltaY * 2,
        behavior: 'smooth'
      });

      // Show buttons when scrolled to the last image
      const isAtBottom = 
        gallery.scrollTop + gallery.clientHeight >= gallery.scrollHeight - 100;
      
      if (isAtBottom) {
        setShowButtons(true);
      }
    };

    // Add scroll event listener
    gallery.addEventListener('scroll', handleScroll);
    gallery.addEventListener('wheel', handleWheel, { passive: false });

    // Generate hearts
    const generateHearts = () => {
      const newHearts = [];
      for (let i = 0; i < 20; i++) {
        newHearts.push({
          id: Math.random(),
          left: Math.random() * 100,
          animationDelay: Math.random() * 5,
          size: Math.random() * 30 + 10,
          opacity: Math.random() * 0.7 + 0.3
        });
      }
      setHearts(newHearts);
    };

    generateHearts();

    return () => {
      gallery.removeEventListener('scroll', handleScroll);
      gallery.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleYesClick = (side) => {
    navigate('/love');
  };

  return (
    <div className="app-container">
      {hearts.map((heart) => (
        <Heart 
          key={heart.id}
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.animationDelay}s`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity
          }}
        />
      ))}
      <div 
        ref={galleryRef} 
        className="scrollable-gallery"
      >
        {imageQuotes.map(({ image, quote, color }, index) => (
          <div 
            key={index} 
            className="gallery-image-container"
          >
            <div 
              key={`quote-${index}`}
              className={`gallery-quote ${currentQuoteIndex === index ? 'active' : ''}`}
              style={{ color: color }}
            >
              {quote}
            </div>
            
            <div 
              className="gallery-image"
              style={{ backgroundImage: `url(${image})`, height: '100vh', width: '100vw', backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function YayPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = () => {
      navigate('/');
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [navigate]);

  return (
    <div className="yay-page">
      <img 
        src={yayImage} 
        alt="Yay!" 
        className="yay-image"
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route path="/love" element={<YayPage />} />
      </Routes>
    </Router>
  );
}

export default App;
