"use client"
import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const TestimonialCarousel = () => {
  // Sample testimonial data
  const testimonials =[
    {
      "id": 1,
      "name": "Mehreen Ahmed",
      "rating": 5,
      "role": "Travel Enthusiast",
      "comment": "Absolutely amazing experience! The team at JOURNY_GENIC made our family trip to Turkey unforgettable. Their attention to detail and personalized service exceeded all expectations.",
      "avatar": "/images/user.png"
    },
    {
      "id": 2,
      "name": "Ali Hamza",
      "rating": 5,
      "role": "Adventure Seeker",
      "comment": "Best travel planning service I've ever used. Their knowledge of off-beat destinations and adventure activities is outstanding. Made my trek to Nepal absolutely perfect!",
      "avatar": "/images/user.png"
    },
    {
      "id": 3,
      "name": "Ayesha Khan",
      "rating": 5,
      "role": "Solo Traveler",
      "comment": "As a solo female traveler, safety was my priority. JOURNY_GENIC ensured I had the most secure yet exciting experience exploring Southeast Asia. Highly recommended!",
      "avatar": "/images/user.png"
    },
    {
      "id": 4,
      "name": "Hassan Ali",
      "rating": 4,
      "role": "Business Traveler",
      "comment": "Their business travel arrangements are top-notch. Seamless bookings, great hotel choices, and excellent support for last-minute changes. Makes business travel stress-free.",
      "avatar": "/images/user.png"
    },
    {
      "id": 5,
      "name": "Fatima Zahra",
      "rating": 5,
      "role": "Honeymoon Planner",
      "comment": "Planned our entire honeymoon through them. The romantic touches and special arrangements they added made our Maldives trip magical!",
      "avatar": "/images/user.png"
    },
    {
      "id": 6,
      "name": "Usman Khan",
      "rating": 5,
      "role": "Family Vacationer",
      "comment": "Perfect family vacation planners! They considered everyone's interests, from my teenage kids to my elderly parents. Our Europe trip was a hit with everyone.",
      "avatar": "/images/user.png"
    },
    {
      "id": 7,
      "name": "Zainab Malik",
      "rating": 5,
      "role": "Culture Explorer",
      "comment": "Their cultural tours are exceptional. The local guides they arranged in Japan were knowledgeable and friendly. Got to experience authentic local culture!",
      "avatar": "/images/user.png"
    },
    {
      "id": 8,
      "name": "Ibrahim Shah",
      "rating": 4,
      "role": "Budget Traveler",
      "comment": "Great options for budget travelers without compromising on experience quality. Their Thailand package was perfectly balanced and affordable.",
      "avatar": "/images/user.png"
    },
    {
      "id": 9,
      "name": "Amina Syed",
      "rating": 5,
      "role": "Luxury Traveler",
      "comment": "The luxury experiences they arranged in Dubai were outstanding. Every detail was perfect, from private transfers to exclusive desert safaris.",
      "avatar": "/images/user.png"
    },
    {
      "id": 10,
      "name": "Saad Ahmed",
      "rating": 5,
      "role": "Photography Enthusiast",
      "comment": "Their photography tours are a dream! They knew exactly where to take us in Iceland for the best shots. A photographer's paradise!",
      "avatar": "/images/user.png"
    }
  ]
  const [currentSlide, setCurrentSlide] = React.useState(0);

  // Function to render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star 
            key={i} 
            className="w-5 h-5 text-yellow-400 fill-yellow-400"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star 
            key={i} 
            className="w-5 h-5 text-yellow-400 fill-yellow-400 opacity-50"
          />
        );
      } else {
        stars.push(
          <Star 
            key={i} 
            className="w-5 h-5 text-gray-300"
          />
        );
      }
    }
    return stars;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Testimonial</h2>
        <p className="text-gray-600">What are members saying.</p>
      </div>

      <div className="relative">
        <button 
          onClick={prevSlide}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="overflow-hidden relative bg-gradient-to-b from-blue-50 to-white rounded-xl p-8">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white">
              <img 
                src={testimonials[currentSlide].avatar} 
                alt={testimonials[currentSlide].name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-lg mb-4">{testimonials[currentSlide].comment}</p>
            
            <div className="flex space-x-1 mb-2">
              {renderStars(testimonials[currentSlide].rating)}
            </div>
            
            <h3 className="font-medium text-xl">
              {testimonials[currentSlide].name}
            </h3>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-blue-500 w-4' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <button 
          onClick={nextSlide}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;