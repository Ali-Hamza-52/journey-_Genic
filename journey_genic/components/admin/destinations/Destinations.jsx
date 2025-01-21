'use client';
import React, { useState } from 'react';
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
import { DestinationForm } from './DestinationForm';
import AdminSectionWrapper from '@/components/common/AdminSectionWrapper';

export const DestinationsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(null);

    // Mock data - replace with your actual data
    const destinations = [
        {
            id: 1,
            name: 'Paris',
            country: 'France',
            city: 'Paris',
            price: 1000,
            tags: ['romantic', 'culture'],
            facilities: ['wifi', 'parking']
        }
    ];

    const filteredDestinations = destinations.filter(dest =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminSectionWrapper>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Input
                        placeholder="Search destinations..."
                        className="max-w-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="flex items-center">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Destination
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Add New Destination</DialogTitle>
                            </DialogHeader>
                            <DestinationForm />
                        </DialogContent>
                    </Dialog>
                </div>

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
                        {filteredDestinations.map((destination) => (
                            <TableRow key={destination.id}>
                                <TableCell>{destination.name}</TableCell>
                                <TableCell>{destination.country}</TableCell>
                                <TableCell>{destination.city}</TableCell>
                                <TableCell>${destination.price}</TableCell>
                                <TableCell>{destination.tags.join(', ')}</TableCell>
                                <TableCell className="space-x-2">
                                    <Button variant="outline" size="sm">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="destructive" size="sm">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div >
        </AdminSectionWrapper>
    );
};