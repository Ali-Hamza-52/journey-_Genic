import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gray-900/55 text-white">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        autoPlay
        loop
        muted
      >
        <source src="/videos/video5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-teal-400">JOURNY_GENIC</h3>
            <p className="text-gray-300">
              Making your travel dreams come true with unforgettable experiences and personalized journeys.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 flex items-center space-x-2 hover:text-teal-400 transition-all transform hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 text-teal-400" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-gray-300 flex items-center space-x-2 hover:text-teal-400 transition-all transform hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 text-teal-400" />
                  <span>Destinations</span>
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-gray-300 flex items-center space-x-2 hover:text-teal-400 transition-all transform hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 text-teal-400" />
                  <span>Tours & Packages</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 flex items-center space-x-2 hover:text-teal-400 transition-all transform hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 text-teal-400" />
                  <span>Travel Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 flex items-center space-x-2 hover:text-teal-400 transition-all transform hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 text-teal-400" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-300 flex items-center space-x-2 hover:text-teal-400 transition-all transform hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 text-teal-400" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/booking-process" className="text-gray-300 flex items-center space-x-2 hover:text-teal-400 transition-all transform hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 text-teal-400" />
                  <span>Booking Process</span>
                </Link>
              </li>
              <li>
                <Link href="/payment-options" className="text-gray-300 flex items-center space-x-2 hover:text-teal-400 transition-all transform hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 text-teal-400" />
                  <span>Payment Options</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 flex items-center space-x-2 hover:text-teal-400 transition-all transform hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 text-teal-400" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 flex items-center space-x-2 hover:text-teal-400 transition-all transform hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 text-teal-400" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal-400 mt-1" />
                <p className="text-gray-300">
                  123 Travel Street,<br />
                  Adventure City, AC 12345<br />
                  Pakistan
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-teal-400" />
                <p className="text-gray-300">+92 300 1234567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-teal-400" />
                <p className="text-gray-300">info@journygenic.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} JOURNY_GENIC. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm">
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-teal-400 transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-teal-400 transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-gray-300 hover:text-teal-400 transition-colors">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <h1 className="text-center text-xl">Developed By <span className="font-extrabold text-yellow-300">BRSIT-20-79</span></h1>
        </div>
      </div>
    </footer>
  );
}
