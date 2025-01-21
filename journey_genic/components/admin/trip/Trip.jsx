'use client';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Plus, Trash } from 'lucide-react';
import { TripForm } from './TripForm';
import AdminSectionWrapper from '@/components/common/AdminSectionWrapper';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { Typography } from '@/components/ui/typography';

export const Trip = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isData, setData] = useState(true);
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/trip');
                if (response.status === 200) {
                    if (response.data.length > 0) {
                        setData(true);
                        setTrips(response.data);
                    } else {
                        setData(false);
                    }
                }
            } catch (error) {
                toast.error('Failed to fetch trips');
                setData(false);
                setLoading(false);
            }
            setLoading(false);
        }

        fetchData();
    }, [])

    const filteredTrips = trips.filter(trip =>
        trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete the trip permanently.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosInstance.delete(`/trip/${id}`);
                    if (response.status === 200) {
                        Swal.fire('Deleted!', 'Your trip has been deleted.', 'success').then((result) => {
                            toast.success('Trip deleted successfully');
                            window.location.reload();
                        })
                        setTrips(trips.filter(trip => trip.id !== id));
                    }
                } catch (error) {
                    Swal.fire('Error!', 'There was an issue deleting the trip.', 'error');
                }
            }
        });
    };

    if (isLoading) {
        return (
            <AdminSectionWrapper>

                <div className="flex items-center justify-center gap-5 min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600" />
                </div>
            </AdminSectionWrapper>
        );
    }

    return (
        <AdminSectionWrapper>
            <Typography weight='semiBold' variant='h4'>
                Trips
            </Typography>
            <div className="space-y-4 mt-1">
                <div className="flex justify-between items-center">
                    <Input
                        placeholder="Search trips..."
                        className="max-w-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="flex items-center">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Trip
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Add New Trip</DialogTitle>
                            </DialogHeader>
                            <TripForm />
                        </DialogContent>
                    </Dialog>
                </div>

                {isData && filteredTrips.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Country</TableHead>
                                <TableHead>City</TableHead>
                                <TableHead>Tags</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTrips.map((trip, index) => (
                                <TableRow key={index}>
                                    <TableCell>{trip.name}</TableCell>
                                    <TableCell>{trip.country}</TableCell>
                                    <TableCell>{trip.city}</TableCell>
                                    <TableCell>{trip.tags.join(', ')}</TableCell>
                                    <TableCell className="space-x-2">


                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-2xl">
                                                <DialogHeader>
                                                    <DialogTitle>Update Trip</DialogTitle>
                                                </DialogHeader>
                                                <TripForm initialData={trip} />
                                            </DialogContent>
                                        </Dialog>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(trip._id)}  // Attach delete handler
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center text-gray-500">
                        {!isLoading && <h2>No Data Found 404</h2>}
                    </div>
                )}
            </div>
        </AdminSectionWrapper>
    );
};
