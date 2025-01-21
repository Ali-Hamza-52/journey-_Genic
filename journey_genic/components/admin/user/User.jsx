"use client";

import React, { useEffect, useState } from "react";
import AdminSectionWrapper from "@/components/common/AdminSectionWrapper";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import UserImage from "@/public/images/user.png";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";


const Users = () => {
    const [users, setUsers] = useState([]); // Explicitly type users state
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchColumn, setSearchColumn] = useState("name");
    const [updatedRole, setUpdatedRole] = useState({});

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get("/user");
                setUsers(response.data); // Populate users with API response
            } catch (error) {
                toast.showError("Error fetching users.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Handle role update
    const handleRoleUpdate = async (userId, newRole) => {
        try {
            console.log("user", userId, newRole)
            const res = await axiosInstance.put(`/user/${userId}`, { role: newRole });
            setUsers((prev) =>
                prev.map((user) =>
                    user._id === userId ? { ...user, role: newRole } : user
                )
            );

            if (res.status === 200)
                toast.success("Role updated successfully!");
        } catch (error) {
            toast.error("Failed to update role.");
        } finally {
            setUpdatedRole((prev) => ({ ...prev, [userId]: "" }));
        }
    };

    // Handle user delete with SweetAlert2
    const handleDeleteUser = async (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosInstance.delete(`/user/${userId}`);
                    setUsers(users.filter((user) => user._id !== userId));
                    Swal.fire("Deleted!", "User has been deleted.", "success");
                } catch (error) {
                    Swal.fire("Error!", "Failed to delete the user.", "error");
                }
            }
        });
    };

    // Filter users based on search input
    const filteredUsers = users.filter((user) => {
        if (searchColumn === "name") {
            return user.username.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (searchColumn === "email") {
            return user.email.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (searchColumn === "role") {
            return user.role.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }
    return (
        <AdminSectionWrapper>
            {/* Search and Filter */}
            <div className="mb-4 grid grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder={`Search by ${searchColumn}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-10 border-2 border-sky-500 rounded px-2"
                />
                <select
                    value={searchColumn}
                    onChange={(e) => setSearchColumn(e.target.value)}
                    className="w-full h-10 border-2 border-sky-500 rounded px-2"
                >
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="role">Role</option>
                </select>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <Image
                                                src={user.profileImage || UserImage}
                                                alt={user.username}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.username}
                                            </div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={updatedRole[user._id] || user.role}
                                        onChange={(e) =>
                                            setUpdatedRole({ ...updatedRole, [user._id]: e.target.value })
                                        }
                                        className="block w-full px-2 py-1 text-sm border-2 rounded"
                                    >
                                        <option value="client">Client</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                                    <Button
                                        variant={"destructive"}
                                        onClick={() => handleDeleteUser(user._id)}
                                    >
                                        Delete
                                    </Button>
                                    {updatedRole[user._id] && (
                                        <Button
                                            onClick={() =>
                                                handleRoleUpdate(user._id, updatedRole[user._id])
                                            }
                                        >
                                            Update
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <p className="text-center mt-4">No users found.</p>
                )}
            </div>
        </AdminSectionWrapper>
    );
};

export default Users;
