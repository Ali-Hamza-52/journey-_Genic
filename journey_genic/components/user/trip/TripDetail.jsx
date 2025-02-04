'use client';
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowLeft } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import axiosInstance from '@/lib/axiosInstance';
import Link from 'next/link';
import SectionWrapper from '@/components/common/SectionWrapper';
import Reviews from '../review/Reviews';
import SocialShareItems from '@/components/common/SocialShareItems';

const TripDetail = ({ id }) => {
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchTripDetails = async () => {
                try {
                    const response = await axiosInstance.get(`/trip/${id}`);
                    setTrip(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching trip details:', error);
                    setLoading(false);
                }
            };

            fetchTripDetails();
        }
    }, [id]);

    if (loading) {
        return <SectionWrapper>
            <div className="flex items-center justify-center gap-5 min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600" />
            </div>
        </SectionWrapper>;
    }

    if (!trip) {
        return <div className="container mx-auto px-4 py-8">Trip not found</div>;
    }

    return (

        <SectionWrapper>
            <Link href="/trips">
                <Button variant="outline" className="mb-6">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back to Trips
                </Button>
            </Link>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Image Carousel */}
                <div>
                    <Carousel className="w-full max-w-md mx-auto">
                        <CarouselContent>
                            {trip.images.map((image, index) => (
                                <CarouselItem key={index}>
                                    <img
                                        src={image}
                                        alt={`${trip.name} - Image ${index + 1}`}
                                        className="w-full h-96 object-cover rounded-lg"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                {/* Trip Details */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{trip.name}</h1>
                    <div className="flex items-center mb-4">
                        <MapPin className="w-5 h-5 mr-2 text-primary" />
                        <span>{trip.city}, {trip.country}</span>
                    </div>

                    <p className="text-muted-foreground mb-6">{trip.description}</p>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {trip.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">Facilities</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {trip.facilities.map((facility) => (
                                <div key={facility} className="flex items-center">
                                    <span className="mr-2">✓</span>
                                    {facility}
                                </div>
                            ))}
                        </div>
                    </div>
                    <SocialShareItems/>
                </div>
            </div>
            <Reviews id={trip._id}/>
        </SectionWrapper>
    );
};

export default TripDetail;