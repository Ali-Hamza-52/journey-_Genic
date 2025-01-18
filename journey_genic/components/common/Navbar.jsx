'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/trips', label: 'Trips' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/chat', label: 'Chat' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
              Login
            </button>
            <button className="border border-teal-600 text-teal-600 px-4 py-2 rounded-md hover:bg-teal-50">
              Sign Up
            </button>
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
                {/* Accessible title for screen readers */}
                <h2 className="sr-only">Mobile Navigation Menu</h2>
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-600 hover:text-teal-600 transition-colors px-4 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="space-y-2 px-4">
                    <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                      Login
                    </button>
                    <button className="w-full border border-teal-600 text-teal-600 px-4 py-2 rounded-md hover:bg-teal-50">
                      Sign Up
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
