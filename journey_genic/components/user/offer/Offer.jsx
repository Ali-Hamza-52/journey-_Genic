'use client'
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Calendar, Users } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Offer = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axiosInstance.get('/offer');
                setOffers(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOffers();
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
                    <AlertDescription>Failed to load offers: {error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-12">Special Offers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {offers.map((offer, index) => {
                    const validUntil = new Date(offer.validUntil);
                    const timeLeft = formatDistance(validUntil, new Date(), { addSuffix: true });

                    return (
                        <Card
                            key={index}
                            className="group overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={offer.images[0]}
                                    alt={offer.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                                    Save ${offer.discount}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                    <h2 className="text-white text-xl font-semibold">{offer.name}</h2>
                                    <p className="text-white/90 text-sm">{offer.city}, {offer.country}</p>
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <p className="text-gray-600 line-clamp-2 mb-4">{offer.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {offer.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Ends {timeLeft}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>{offer.maxBookings} spots</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 border-t flex-col gap-3">
                                <div className="flex items-center justify-between w-full">
                                    <div>
                                        <p className="text-lg font-semibold">
                                            ${(offer.price - offer.discount).toLocaleString()}
                                        </p>
                                        <p className="text-sm text-gray-500 line-through">
                                            ${offer.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <Badge variant="default">Book Now</Badge>
                                </div>
                                <Button className={'w-full'}>
                                    <Link href={`/offers/${offer._id}`}>
                                        View Details
                                    </Link> 
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default Offer;