// 'use client';
// import React, { useEffect, useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Pencil, Plus, Trash } from 'lucide-react';
// import { DestinationForm } from './DestinationForm';
// import AdminSectionWrapper from '@/components/common/AdminSectionWrapper';
// import { toast } from 'sonner';
// import axiosInstance from '@/lib/axiosInstance';

// export const DestinationsPage = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isEditing, setIsEditing] = useState(false);
//     const [isData, setData] = useState(true); // Default to true, set false if no data
//     const [destinations, setDestinations] = useState([]);
//     const [selectedDestination, setSelectedDestination] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             console.log('i am fetching data')
//             try {
//                 const response = await axiosInstance.get('/destination');
//                 console.log("response: ", response);
//                 if (response.status === 200) {
//                     if (response.data.length > 0) {
//                         setData(true);
//                         setDestinations(response.data);
//                     } else {
//                         setData(false);
//                     }
//                 }
//             } catch (error) {
//                 console.log("error: ", error.message)
//                 toast.error('Failed to fetch destinations');
//                 setData(false);
//             }
//         }

//         fetchData();
//     }, [])

//     const filteredDestinations = destinations.filter(dest =>
//         dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         dest.city.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <AdminSectionWrapper>
//             <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                     <Input
//                         placeholder="Search destinations..."
//                         className="max-w-sm"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <Dialog>
//                         <DialogTrigger asChild>
//                             <Button className="flex items-center">
//                                 <Plus className="mr-2 h-4 w-4" />
//                                 Add Destination
//                             </Button>
//                         </DialogTrigger>
//                         <DialogContent className="max-w-2xl">
//                             <DialogHeader>
//                                 <DialogTitle>Add New Destination</DialogTitle>
//                             </DialogHeader>
//                             <DestinationForm />
//                         </DialogContent>
//                     </Dialog>
//                 </div>

//                 {isData && filteredDestinations.length > 0 ? (
//                     <Table>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead>Name</TableHead>
//                                 <TableHead>Country</TableHead>
//                                 <TableHead>City</TableHead>
//                                 <TableHead>Price</TableHead>
//                                 <TableHead>Tags</TableHead>
//                                 <TableHead>Actions</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {filteredDestinations.map((destination,index) => (
//                                 <TableRow key={index}>
//                                     <TableCell>{destination.name}</TableCell>
//                                     <TableCell>{destination.country}</TableCell>
//                                     <TableCell>{destination.city}</TableCell>
//                                     <TableCell>${destination.price}</TableCell>
//                                     <TableCell>{destination.tags.join(', ')}</TableCell>
//                                     <TableCell className="space-x-2">
//                                         <Button variant="outline" size="sm">
//                                             <Pencil className="h-4 w-4" />
//                                         </Button>
//                                         <Button variant="destructive" size="sm">
//                                             <Trash className="h-4 w-4" />
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 ) : (
//                     <div className="text-center text-gray-500">
//                         <h2>No Data Found 404</h2>
//                     </div>
//                 )}
//             </div>
//         </AdminSectionWrapper>
//     );
// };

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
import { DestinationForm } from './DestinationForm';
import AdminSectionWrapper from '@/components/common/AdminSectionWrapper';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import Swal from 'sweetalert2';  // Import SweetAlert2

export const DestinationsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isData, setData] = useState(true);
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/destination');
                if (response.status === 200) {
                    if (response.data.length > 0) {
                        setData(true);
                        setDestinations(response.data);
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

    const filteredDestinations = destinations.filter(dest =>
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
                    const response = await axiosInstance.delete(`/destination/${id}`);
                    if (response.status === 200) {
                        Swal.fire('Deleted!', 'Your destination has been deleted.', 'success').then((result) => {
                            toast.success('Destination deleted successfully');
                            window.location.reload();
                        })
                        setDestinations(destinations.filter(destination => destination.id !== id));
                    }
                } catch (error) {
                    Swal.fire('Error!', 'There was an issue deleting the destination.', 'error');
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

                {isData && filteredDestinations.length > 0 ? (
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
                            {filteredDestinations.map((destination, index) => (
                                <TableRow key={index}>
                                    <TableCell>{destination.name}</TableCell>
                                    <TableCell>{destination.country}</TableCell>
                                    <TableCell>{destination.city}</TableCell>
                                    <TableCell>${destination.price}</TableCell>
                                    <TableCell>{destination.tags.join(', ')}</TableCell>
                                    <TableCell className="space-x-2">


                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-2xl">
                                                <DialogHeader>
                                                    <DialogTitle>Update Destination</DialogTitle>
                                                </DialogHeader>
                                                <DestinationForm initialData={destination} />
                                            </DialogContent>
                                        </Dialog>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(destination._id)}  // Attach delete handler
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
