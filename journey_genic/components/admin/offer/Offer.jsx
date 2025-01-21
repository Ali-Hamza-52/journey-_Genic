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
import { OfferForm } from './OfferForm';
import AdminSectionWrapper from '@/components/common/AdminSectionWrapper';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import Swal from 'sweetalert2';  // Import SweetAlert2

export const Offer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isData, setData] = useState(true);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/offer');
                console.log('offer', response)
                if (response.status === 200) {
                    if (response.data.length > 0) {
                        setData(true);
                        setOffers(response.data);
                    } else {
                        setData(false);
                    }
                }
            } catch (error) {
                toast.error('Failed to fetch destinations');
                setData(false);
                setLoading(false);
            }
            setLoading(false);
        }

        fetchData();
    }, [])

    const filteredOffers = offers.filter(dest =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete the destination permanently.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosInstance.delete(`/offer/${id}`);
                    if (response.status === 200) {
                        Swal.fire('Deleted!', 'Your destination has been deleted.', 'success').then((result) => {
                            toast.success('Offer deleted successfully');
                            window.location.reload();
                        })
                        setOffers(offers.filter(offer => offer.id !== id));
                    }
                } catch (error) {
                    Swal.fire('Error!', 'There was an issue deleting the offer.', 'error');
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
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Input
                        placeholder="Search Offers..."
                        className="max-w-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="flex items-center">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Offer
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Add New Offer</DialogTitle>
                            </DialogHeader>
                            <OfferForm />
                        </DialogContent>
                    </Dialog>
                </div>

                {isData && filteredOffers.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Country</TableHead>
                                <TableHead>City</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Tags</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOffers.map((offer, index) => (
                                <TableRow key={index}>
                                    <TableCell>{offer.name}</TableCell>
                                    <TableCell>{offer.country}</TableCell>
                                    <TableCell>{offer.city}</TableCell>
                                    <TableCell>${offer.price}</TableCell>
                                    <TableCell>{offer.tags.join(', ')}</TableCell>
                                    <TableCell className="space-x-2">


                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-2xl overflow-y-scroll">
                                                <DialogHeader>
                                                    <DialogTitle>Update Destination</DialogTitle>
                                                </DialogHeader>
                                                <OfferForm initialData={offer} />
                                            </DialogContent>
                                        </Dialog>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(offer._id)}  // Attach delete handler
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
