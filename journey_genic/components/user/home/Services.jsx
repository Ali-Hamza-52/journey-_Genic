'use client';
import { useEffect, useState } from 'react';
import { 
  Compass, 
  Shield, 
  Map, 
  HeadsetHelp 
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const iconMap = {
  Compass: Compass,
  Shield: Shield,
  Map: Map,
  HeadsetHelp: HeadsetHelp,
};

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await import('@/public/data/services.json');
      setServices(response.services);
    };
    fetchServices();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Should You Choose Us
        </h2>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {services.map((service) => {
              const IconComponent = iconMap[service.icon];
              return (
                <CarouselItem key={service.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-6">
                    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                      <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full mb-4">
                        {/* <IconComponent className="w-6 h-6 text-teal-600" /> */}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}