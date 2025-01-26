'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import axiosInstance from '@/lib/axiosInstance';
import AdminSectionWrapper from '@/components/common/AdminSectionWrapper';

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get('/booking');
                setBookings(response.data);
                setError(null);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching bookings');
                setBookings([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <AdminSectionWrapper>

            <Card>
                <CardHeader>
                    <CardTitle>Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead>Offer</TableHead>
                                <TableHead>Total Price</TableHead>
                                <TableHead>Seats</TableHead>
                                <TableHead>Discount</TableHead>
                                <TableHead>Created At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell>{booking.userId.username}</TableCell>
                                    <TableCell>{booking.offerId.name}</TableCell>
                                    <TableCell>RS. {booking.totalPrice}</TableCell>
                                    <TableCell>{booking.seats}</TableCell>
                                    <TableCell>RS. {booking.discount}</TableCell>
                                    <TableCell>
                                        {new Date(booking.createdAt).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AdminSectionWrapper>
    );
};

export default Booking;