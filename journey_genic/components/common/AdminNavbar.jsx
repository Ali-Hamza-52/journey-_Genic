'use client';
import {
  CircleUserRound,
  House,
  Layers3,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar } from "../ui/avatar";

const AdminNavbar = () => {
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const myDetail = localStorage.getItem('travelingUser');
      if (myDetail) {
        const parsedUser = JSON.parse(myDetail);
        setUser(parsedUser);
        console.log("User loaded:", parsedUser);
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);

    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <>
      <div className="hidden md:flex flex-col fixed top-0 left-0 items-center w-72 min-h-screen overflow-hidden text-gray-400 bg-gray-900 ">
        <Link className="flex items-center w-full px-4 ml-3 mt-3" href="#">
          <svg
            className="w-8 h-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
          <span className="ml-5">Journey Genic</span>
        </Link>
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
            <Link className="flex items-center w-full h-12 px-4 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/admin/dashboard">
              <House />
              <span className="ml-5">Dashboard</span>
            </Link>
            <Link className="flex items-center w-full h-12 px-4 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/admin/user">
              <Users />
              <span className="ml-5">Users</span>
            </Link>
            <Link className="flex items-center w-full h-12 px-4 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/admin/offers">
              <ShoppingCart />
              <span className="ml-5">Offers</span>
            </Link>
            <Link className="flex items-center w-full h-12 px-4 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/admin/places">
              <ShoppingCart />
              <span className="ml-5">Places</span>
            </Link>
            <Link className="flex items-center w-full h-12 px-4 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/admin/trips">
              <Layers3 />
              <span className="ml-5">Trips</span>
            </Link>
          </div>
        </div>
        <Link className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300" href="/admin/profile">
          {user ? (
            <Avatar src={user.avatar ? user.avatar : "/images/user.png"} alt={user.username} />
          ) : (
            <CircleUserRound />
          )}
          <span className="ml-5">{user?.username}</span>
        </Link>
      </div>
    </>
  );
};

export default AdminNavbar;
