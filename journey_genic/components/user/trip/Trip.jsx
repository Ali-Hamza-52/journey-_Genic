'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin } from "lucide-react";
import axiosInstance from '@/lib/axiosInstance';
import Link from 'next/link';
import SectionWrapper from '@/components/common/SectionWrapper';

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axiosInstance.get('/trip');
                setTrips(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching trips:', error);
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

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

    return (
        <SectionWrapper>

            <h1 className="text-3xl font-bold mb-8">Explore Our Trips</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip, index) => (
                    <Card
                        key={index}
                        className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300"
                    >
                        <CardHeader>
                            <div className="relative">
                                <img
                                    src={trip.images[0]}
                                    alt={trip.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <Badge variant="secondary" className="absolute top-2 right-2">
                                    {trip.country}
                                </Badge>
                            </div>
                            <CardTitle className="mt-2">{trip.name}</CardTitle>
                            <CardDescription className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {trip.city}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {trip.tags.slice(0, 3).map((tag) => (
                                    <Badge key={tag} variant="outline">{tag}</Badge>
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {trip.description}
                            </p>
                            <Link href={`/trips/${trip._id}`}>
                                <Button variant="outline" className="w-full mt-4">
                                    View Details <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>

        </SectionWrapper>

    );
};

export default Trips;