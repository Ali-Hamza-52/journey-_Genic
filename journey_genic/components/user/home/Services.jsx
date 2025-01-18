"use client";

import React, { useState, useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Mountain, Landmark, Sun, Waves, TreePine, Building, Snowflake, PawPrint, Ship } from "lucide-react";
import Image from "next/image";

const iconMap = {
  Mountain: Mountain,
  Landmark: Landmark,
  Sun: Sun,
  Waves: Waves,
  TreePine: TreePine,
  Building: Building,
  Snowflake: Snowflake,
  PawPrint: PawPrint,
  Ship: Ship,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetch("/data/services.json") // Ensure services.json is inside /public/data/
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error loading services:", error));
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" }); // Adjust scroll distance
      }
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [services]); // Re-run when services load

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold text-center mb-5">🌍 Our Tour Services</h2>
      {services.length > 0 ? (
        <Carousel ref={carouselRef}>
          <CarouselContent>
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Mountain; // Default icon
              return (
                <CarouselItem key={service.id} className="p-4">
                  <Card className="shadow-lg border border-gray-200 hover:shadow-xl transition">
                    <CardHeader className="flex">
                      <IconComponent className="w-12 h-12 text-blue-500" />
                      <div className="py-3 px-1">
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={service.image}
                        alt={service.title}
                        className="w-full h-64 object-cover rounded-lg"
                        height={1000}
                        width={1000}
                        quality={100}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p className="text-center text-gray-500">Loading services...</p>
      )}
    </div>
  );
};

export default Services;
