'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const DestinationDetail = ({id}) => {
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axiosInstance.get(`/destination/${id}`);
        setDestination(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <Skeleton className="h-96 w-full mb-8" />
        <Skeleton className="h-8 w-2/3 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load destination details: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!destination) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <Carousel className="mb-8">
          <CarouselContent>
            {destination.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
                  <img
                    src={image}
                    alt={`${destination.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
            <p className="text-xl text-gray-600">
              {destination.city}, {destination.country}
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">About</h2>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {destination.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Facilities</h2>
                  <ul className="space-y-2">
                    {destination.facilities.map((facility) => (
                      <li key={facility} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      ${destination.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Starting price</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;