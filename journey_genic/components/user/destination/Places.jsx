'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, MoveUpRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const DestinationsGrid = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchDestinations = async () => {
            try {
                const response = await axiosInstance.get('/destination');
                setDestinations(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                {[...Array(6)].map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardHeader>
                            <Skeleton className="h-6 w-2/3 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                    </Card>
                ))}
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
                        Failed to load destinations: {error}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-12">Explore Destinations</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {destinations.map((destination, index) => (
                    <Card
                        key={index}
                        className="group overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={destination.images[0]}
                                alt={destination.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                <h2 className="text-white text-xl font-semibold">{destination.name}</h2>
                                <p className="text-white/90 text-sm">{destination.city}, {destination.country}</p>
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <p className="text-gray-600 line-clamp-2 mb-4">{destination.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {destination.tags.slice(0, 3).map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 border-t justify-between">
                            <p className="text-lg font-semibold">
                                RS. {destination.price.toLocaleString()}
                            </p>
                            <Button className={'hover:underline hover:underline-offset-2 flex gap-2'}>
                                <Link href={`/destinations/${destination._id}`}>View Details</Link>
                                <MoveUpRight />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DestinationsGrid;