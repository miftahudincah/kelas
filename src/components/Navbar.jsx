import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="navbar bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" data-aos="fade-down">
      <div className="navbar-start">
        <div className="dropdown" data-aos="fade-right">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gradient-to-r from-blue-500 to-purple-600 rounded-box w-52">
            <li><Link to="/produk" className="text-white hover:text-gray-100">Produk</Link></li>
            <li><Link to="/HTMLForBeginners" className="text-white hover:text-gray-100">Courses</Link></li>
            <li><Link to="/contact" className="text-white hover:text-gray-100">Contact</Link></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl text-white" data-aos="fade-left">Trainersmk.id</Link>
      </div>
      <div className="navbar-center hidden lg:flex" data-aos="fade-up">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/produk" className="text-white hover:text-gray-100">Produk</Link></li>
          <li><Link to="/HTMLForBeginners" className="text-white hover:text-gray-100">Courses</Link></li>
          <li><Link to="/contact" className="text-white hover:text-gray-100">Contact</Link></li>
        </ul>
      </div>
      <div className="navbar-end" data-aos="fade-left">
        <button className="btn btn-ghost btn-circle bg-blue-500 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1M12 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle bg-purple-500 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c.61 0 1.23-.11 1.81-.34.64-.25 1.26-.6 1.81-1.04a8.973 8.973 0 001.68-1.68c.44-.55.79-1.17 1.04-1.81.23-.58.34-1.2.34-1.81V5.62L13.35 2a1 1 0 00-1.39 0L4.62 8.01A5.62 5.62 0 004 10v6c0 1.2.38 2.31 1.02 3.25.53.8 1.23 1.48 2.08 2 .85.53 1.78.94 2.76 1.24.3.09.62.16.94.21.05.01.1.01.15.01zM12 2v1.25M12 3v1.25M8 8v1.25M8 9v1.25M12 8v1.25M12 9v1.25M16 8v1.25M16 9v1.25M5 11.25h1.25M6.25 11.25H7.5M7.5 11.25H8.75M8.75 11.25H10M10 11.25H11.25M11.25 11.25H12.5M12.5 11.25H13.75M13.75 11.25H15M15 11.25H16.25M16.25 11.25H17.5M5 12.75h1.25M6.25 12.75H7.5M7.5 12.75H8.75M8.75 12.75H10M10 12.75H11.25M11.25 12.75H12.5M12.5 12.75H13.75M13.75 12.75H15M15 12.75H16.25M16.25 12.75H17.5M5 14.25h1.25M6.25 14.25H7.5M7.5 14.25H8.75M8.75 14.25H10M10 14.25H11.25M11.25 14.25H12.5M12.5 14.25H13.75M13.75 14.25H15M15 14.25H16.25M16.25 14.25H17.5M5 15.75h1.25M6.25 15.75H7.5M7.5 15.75H8.75M8.75 15.75H10M10 15.75H11.25M11.25 15.75H12.5M12.5 15.75H13.75M13.75 15.75H15M15 15.75H16.25M16.25 15.75H17.5M5 17.25h1.25M6.25 17.25H7.5M7.5 17.25H8.75M8.75 17.25H10M10 17.25H11.25M11.25 17.25H12.5M12.5 17.25H13.75M13.75 17.25H15M15 17.25H16.25M16.25 17.25H17.5" />
          </svg>
        </button>
        <Link to="/login" className="btn bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:text-gray-100">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
