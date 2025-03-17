import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const petImages = [
  {
    url: "https://blog.btaskee.com/wp-content/uploads/2020/02/cham-soc-thu-cung.jpg",
    caption: ""
  },
  {
    url: "https://azpet.b-cdn.net/wp-content/uploads/2022/09/GettyImages-1215536561-8cd3b21533da4a199e48b1ab8560eaee.jpg",
    caption: ""
  },
  {
    url: "https://congcutot.vn/uploads/store/page/article/2023/11/cham-soc-thu-cung-tai-cua-hang.jpg",
    caption: ""
  },
  {
    url: "https://file.hstatic.net/200000165197/article/dsc05818_1a66e21254bf4152825c5314fe207b91_2048x2048.jpg",
    caption: ""
  }
];

const PetSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % petImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % petImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + petImages.length) % petImages.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {petImages.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.url}
            alt={image.caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <p className="text-white text-xl font-semibold">{image.caption}</p>
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {petImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PetSlider; 