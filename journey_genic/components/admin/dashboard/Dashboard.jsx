// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle
// } from '@/components/ui/card';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow
// } from '@/components/ui/table';
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     ResponsiveContainer
// } from 'recharts';
// import {
//     Plane,
//     DollarSign,
//     Users,
//     MapPin,
//     Loader2
// } from 'lucide-react';
// import axiosInstance from '@/lib/axiosInstance';
// import AdminSectionWrapper from '@/components/common/AdminSectionWrapper';

// const Dashboard = () => {
//     const [bookings, setBookings] = useState([]);
//     const [offers, setOffers] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchDashboardData = async () => {
//             try {
//                 setIsLoading(true);

//                 // Parallel API calls
//                 const [bookingsResponse, offersResponse] = await Promise.all([
//                     axiosInstance.get('/booking'),
//                     axiosInstance.get('/offer')
//                 ]);

//                 setBookings(bookingsResponse.data);
//                 setOffers(offersResponse.data);
//                 setError(null);
//             } catch (err) {
//                 setError(err.message || 'Error fetching dashboard data');
//                 setBookings([]);
//                 setOffers([]);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchDashboardData();
//     }, []);

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-full">
//                 <Loader2 className="animate-spin" size={48} />
//             </div>
//         );
//     }

//     // Calculate dashboard metrics
//     const totalBookings = bookings.length;
//     const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

//     // Popular destinations from offers
//     const popularDestinations = offers
//         .map(offer => ({
//             name: offer.name,
//             bookings: bookings.filter(b => b.offerId._id === offer._id).length
//         }))
//         .sort((a, b) => b.bookings - a.bookings)
//         .slice(0, 4);

//     return (
//         <AdminSectionWrapper>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
//                 {/* Overview Cards */}
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle>Total Bookings</CardTitle>
//                         <Plane className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">{totalBookings}</div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle>Total Revenue</CardTitle>
//                         <DollarSign className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">RS. {totalRevenue.toLocaleString()}</div>
//                     </CardContent>
//                 </Card>

//                 {/* Popular Destinations */}
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle>Popular Destinations</CardTitle>
//                         <MapPin className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>Destination</TableHead>
//                                     <TableHead className="text-right">Bookings</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {popularDestinations.map((dest) => (
//                                     <TableRow key={dest.name}>
//                                         <TableCell>{dest.name}</TableCell>
//                                         <TableCell className="text-right">{dest.bookings}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </CardContent>
//                 </Card>

//                 {/* Recent Bookings */}
//                 <Card className="col-span-full">
//                     <CardHeader>
//                         <CardTitle>Recent Bookings</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>Username</TableHead>
//                                     <TableHead>Offer</TableHead>
//                                     <TableHead>Total Price</TableHead>
//                                     <TableHead className="text-right">Date</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {bookings.slice(0, 5).map((booking) => (
//                                     <TableRow key={booking._id}>
//                                         <TableCell>{booking.userId.username}</TableCell>
//                                         <TableCell>{booking.offerId.name}</TableCell>
//                                         <TableCell>${booking.totalPrice}</TableCell>
//                                         <TableCell className="text-right">
//                                             {new Date(booking.createdAt).toLocaleDateString()}
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </CardContent>
//                 </Card>
//             </div>
//         </AdminSectionWrapper>
//     );
// };

// export default Dashboard;

'use client';

import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    Plane,
    DollarSign,
    Users,
    MapPin,
    Loader2
} from 'lucide-react';
import axiosInstance from '@/lib/axiosInstance';
import AdminSectionWrapper from '@/components/common/AdminSectionWrapper';

const Dashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);

                const [bookingsResponse, offersResponse] = await Promise.all([
                    axiosInstance.get('/booking'),
                    axiosInstance.get('/offer')
                ]);

                setBookings(bookingsResponse.data);
                setOffers(offersResponse.data);
                setError(null);
            } catch (err) {
                setError(err.message || 'Error fetching dashboard data');
                setBookings([]);
                setOffers([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    // Calculate dashboard metrics
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

    // Popular destinations from offers
    const popularDestinations = offers
        .map(offer => ({
            name: offer.name,
            bookings: bookings.filter(b => b.offerId._id === offer._id).length
        }))
        .sort((a, b) => b.bookings - a.bookings)
        .slice(0, 4);

    // Prepare data for monthly revenue chart
    const monthlyRevenueData = bookings.reduce((acc, booking) => {
        const month = new Date(booking.createdAt).toLocaleString('default', { month: 'short' });
        const existingMonth = acc.find(item => item.month === month);
        if (existingMonth) {
            existingMonth.revenue += booking.totalPrice;
        } else {
            acc.push({ month, revenue: booking.totalPrice });
        }
        return acc;
    }, []);

    // Prepare data for bookings by offer chart
    const bookingsByOfferData = offers.map(offer => ({
        name: offer.name,
        bookings: bookings.filter(b => b.offerId._id === offer._id).length
    }));

    return (
        <AdminSectionWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {/* Existing overview cards remain the same */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Total Bookings</CardTitle>
                        <Plane className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalBookings}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">RS. {totalRevenue.toLocaleString()}</div>
                    </CardContent>
                </Card>

                {/* Popular Destinations */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Popular Destinations</CardTitle>
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Destination</TableHead>
                                    <TableHead className="text-right">Bookings</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {popularDestinations.map((dest) => (
                                    <TableRow key={dest.name}>
                                        <TableCell>{dest.name}</TableCell>
                                        <TableCell className="text-right">{dest.bookings}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Monthly Revenue Chart */}
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Monthly Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyRevenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="revenue" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Bookings by Offer Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Bookings by Offer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={bookingsByOfferData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="bookings"
                                >
                                    {bookingsByOfferData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Recent Bookings */}
                <Card className="col-span-full">
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Offer</TableHead>
                                    <TableHead>Total Price</TableHead>
                                    <TableHead className="text-right">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bookings.slice(0, 5).map((booking) => (
                                    <TableRow key={booking._id}>
                                        <TableCell>{booking.userId.username}</TableCell>
                                        <TableCell>{booking.offerId.name}</TableCell>
                                        <TableCell>RS. {booking.totalPrice}</TableCell>
                                        <TableCell className="text-right">
                                            {new Date(booking.createdAt).toLocaleDateString()}
                                        </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AdminSectionWrapper>
    );
};

export default Dashboard;