// src/components/navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white/90 shadow-md py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/">
          <span className="text-2xl font-serif text-gray-800 cursor-pointer">My Blog</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/">
            <span className="text-gray-600 hover:text-gray-900 transition cursor-pointer">Home</span>
          </Link>
          <Link href="/admin/login">
            <span className="text-gray-600 hover:text-gray-900 transition cursor-pointer">Admin Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;