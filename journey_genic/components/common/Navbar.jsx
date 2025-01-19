// 'use client'
// import { useState } from 'react';
// import Link from 'next/link';
// import { Menu } from 'lucide-react';
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// const navLinks = [
//   { href: '/', label: 'Home' },
//   { href: '/destinations', label: 'Destinations' },
//   { href: '/trips', label: 'Trips' },
//   { href: '/gallery', label: 'Gallery' },
//   { href: '/chat', label: 'Chat' },
//   { href: '/contact', label: 'Contact' },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link href="/" className="flex items-center">
//               <span className="text-2xl font-bold text-teal-600">JOURNY_GENIC</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-gray-600 hover:text-teal-600 transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
//               <Link href={'/login'}>
//                 Login
//               </Link>
//             </button>
//             <button className="border border-teal-600 text-teal-600 px-4 py-2 rounded-md hover:bg-teal-50">
//               <Link href={'/signup'}>
//                 Sign Up
//               </Link>
//             </button>
//           </div>

//           {/* Mobile Navigation */}
//           <div className="md:hidden">
//             <Sheet>
//               <SheetTrigger asChild>
//                 <button className="p-2">
//                   <Menu className="h-6 w-6" />
//                 </button>
//               </SheetTrigger>
//               <SheetContent side="left" className="w-[300px]">
//                 {/* Accessible title for screen readers */}
//                 <h2 className="sr-only">Mobile Navigation Menu</h2>
//                 <div className="flex flex-col space-y-4 mt-8">
//                   {navLinks.map((link) => (
//                     <Link
//                       key={link.href}
//                       href={link.href}
//                       className="text-gray-600 hover:text-teal-600 transition-colors px-4 py-2"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       {link.label}
//                     </Link>
//                   ))}
//                   <div className="space-y-2 px-4">
//                     <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
//                       <Link href={'/login'}>
//                         Login
//                       </Link>
//                     </button>
//                     <button className="w-full border border-teal-600 text-teal-600 px-4 py-2 rounded-md hover:bg-teal-50">
//                       <Link href={'/signup'}>
//                         Sign Up
//                       </Link>
//                     </button>
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </nav >
//   );
// }

'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, LogOut, Settings, User, Mail } from 'lucide-react';
import { Phone, MapPin } from 'lucide-react'; // Importing necessary Lucid Icons

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'sonner';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/trips', label: 'Trips' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/chat', label: 'Chat' },
  { href: '/contact', label: 'Contact' },
];

const authRoutes = ['/login', '/signup'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  useEffect(() => {

    const checkAuth = () => {
      const user = localStorage.getItem('travelingUser');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUser(parsedUser);
        console.log("user: ", parsedUser);
      }
      // const accessToken = Cookies.get('accessToken');
      // console.log('accessToken', accessToken);
      // const storedUser = localStorage.getItem('travelingUser');

      // if (accessToken && storedUser) {
      //   try {
      //     console.log("storedUser: ", storedUser);
      //     const parsedUser = JSON.parse(storedUser);
      //     setUser(parsedUser);
      //     console.log("user: ", parsedUser);
      //   } catch (error) {
      //     console.error('Error parsing user data:', error);
      //   }
      // }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);


  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get('/user/logout');
      console.log('Logged out:', response);
      if (response.status === 200) {
        localStorage.removeItem('travelingUser');
        localStorage.removeItem('travelingUserId');
        setUser(null);
        window.location.href = '/';
      }
    } catch {
      toast.error('Error logging out');
    }
  };

  const isAuthPage = authRoutes.includes(pathname);

  return (
    <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-teal-600">JOURNY_GENIC</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${pathname === link.href
                  ? 'text-teal-600 font-medium'
                  : 'text-gray-600 hover:text-teal-600'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {!user && !isAuthPage && (
              <>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                  <Link href="/login">Login</Link>
                </button>
                <button className="border border-teal-600 text-teal-600 px-4 py-2 rounded-md hover:bg-teal-50">
                  <Link href="/signup">Sign Up</Link>
                </button>
              </>
            )}

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarImage
                      src={user.avatar ? user.avatar : '/images/user.png'}
                      alt={user.username}
                    />
                    <AvatarFallback className="bg-teal-100 text-teal-600">
                      {user.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 rounded-lg shadow-lg bg-white border border-gray-200">
                  <div className="">
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 p-2">
                      <User className="mr-2 h-4 w-4" />
                      <p className="font-semibold text-lg">{user.username}</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 p-2">
                      <Mail className="mr-2 h-4 w-4" />
                      <p className="text-sm">{user.email}</p>

                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 p-2">
                      <Phone className="mr-2 h-5 w-5" />
                      <span>{user.phoneNumber}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 p-2">
                    <MapPin className="mr-2 h-5 w-5" />
                    <span>{user.address}</span>
                    </DropdownMenuItem>
                  </div>
                  <div className="border-t-4 border-gray-100">
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 p-2">
                      <Settings className="mr-2 h-4 w-4" />
                      <Link href="/profile">Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-gray-100 p-2" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {user && (
                    <div className="flex items-center space-x-4 px-4 py-2 border-b">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.profilePic} alt={user.name} />
                        <AvatarFallback className="bg-teal-100 text-teal-600">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  )}

                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`transition-colors px-4 py-2 ${pathname === link.href
                        ? 'text-teal-600 font-medium'
                        : 'text-gray-600 hover:text-teal-600'
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {user ? (
                    <div className="space-y-2 px-4 pt-4 border-t">
                      <Link href="/profile" className="flex items-center text-gray-600 hover:text-teal-600">
                        <User className="mr-2 h-4 w-4" />
                        View Profile
                      </Link>
                      <Link href="/settings" className="flex items-center text-gray-600 hover:text-teal-600">
                        <Settings className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-red-600 hover:text-red-700"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  ) : !isAuthPage && (
                    <div className="space-y-2 px-4">
                      <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                        <Link href="/login">Login</Link>
                      </button>
                      <button className="w-full border border-teal-600 text-teal-600 px-4 py-2 rounded-md hover:bg-teal-50">
                        <Link href="/signup">Sign Up</Link>
                      </button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}