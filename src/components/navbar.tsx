// src/components/navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/">
          <span className="text-2xl font-bold text-gray-800 cursor-pointer">
            Raghav's || Blog
          </span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/">
            <span className="text-gray-600 hover:text-gray-900 transition cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/about">
            <span className="text-gray-600 hover:text-gray-900 transition cursor-pointer">
              About
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-gray-600 hover:text-gray-900 transition cursor-pointer">
              Contact
            </span>
          </Link>
          {/* Admin login link can be hidden or removed from public view */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;