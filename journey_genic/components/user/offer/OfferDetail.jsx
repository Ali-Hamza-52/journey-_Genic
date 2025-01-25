'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    AlertCircle,
    Calendar,
    Users,
    Check,
    MapPin,
    Clock,
    DollarSign
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { formatDistance } from 'date-fns';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const OfferDetail = ({ id }) => {
    const router = useRouter();
    const [offer, setOffer] = useState(null);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [numSeats, setNumSeats] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem("travelingUserId");
            if (storedUserId) {
                setUserId(storedUserId.replace(/^"|"$/g, ''));
            } else {
                console.warn("User ID not found in localStorage");
            }
        }
    }, []);


    useEffect(() => {
        const fetchOffer = async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get(`/offer/${id}`);
                setOffer(response.data);
            } catch (err) {
                console.error('Failed to fetch offer:', err);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) fetchOffer();
    }, [id]);

    const handleBookNow = () => {
        setBookingModalOpen(true);
    };

    const handleConfirmBooking = async () => {
        console.log("Booking details", { userId, totalCost: (offer.price - offer.discount) * numSeats, numSeats, offerId: offer._id, discount: offer.discount });

        setIsBooking(true);
        try {
            const response = await axiosInstance.post(`/booking`, { userId, price:offer.price, totalCost: ((offer.price * numSeats) - (offer.discount * numSeats)), numSeats, offerId: offer._id, discount: offer.discount * numSeats });
            console.log("result: ", response);
            if (response.status === 200) {
                toast.success("Booking Successful! Your tour has been booked.");
            }
            if (response.status === 400) {
                toast.warning("You already have a booking for this offer.");
            }

            setBookingModalOpen(false);
        } catch (err) {
            toast.error("Booking Failed: " + (err.response?.data?.message || "Please try again."));
        } finally {
            setIsBooking(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Skeleton width="300px" height="200px" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <Carousel className="w-full">
                        <CarouselContent>
                            {offer.images?.map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                                        <img src={image} alt={`${offer.name} view ${index + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <h1 className="text-3xl md:text-4xl font-bold">{offer.name}</h1>
                        <div className="flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 mr-2" />
                            <span>{offer.city}, {offer.country}</span>
                        </div>
                        <p className="text-gray-600">{offer.description}</p>
                    </div>

                    <div className="md:col-span-1">
                        <Card className="sticky top-8">
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Original Price</span>
                                        <span className="text-lg text-gray-500 line-through">RS. {offer.price.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Discount</span>
                                        <span className="text-lg text-red-500">-RS. {offer.discount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t">
                                        <span className="font-semibold">Final Price</span>
                                        <span className="text-2xl font-bold">RS. {(offer.price - offer.discount).toLocaleString()}</span>
                                    </div>
                                </div>
                                <Button className="w-full" size="lg" onClick={handleBookNow}>Book Now</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Booking</DialogTitle>
                        <DialogDescription>Review your booking details before confirming.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="font-semibold">{offer.name}</h3>
                            <p className="text-sm text-gray-500">{offer.city}, {offer.country}</p>
                        </div>

                        <div className="space-y-2 text-sm">
                            <label>Number of Seats:</label>
                            <input
                                type="number"
                                min="1"
                                value={numSeats}
                                onChange={(e) => setNumSeats(Number(e.target.value))}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setBookingModalOpen(false)} disabled={isBooking}>Cancel</Button>
                        <Button onClick={handleConfirmBooking} disabled={isBooking}>{isBooking ? 'Booking...' : 'Confirm Booking'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OfferDetail;
