"use client";

import React, { useState, useEffect } from "react";
import { FaLuggageCart, FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // const { cartCount } = useCart();

  const navItems = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "products", path: "/products" },
    { name: "contact", path: "/contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 w-full transition-all duration-300 ease-in-out z-[100] items-center ${
          isScrolled
            ? "bg-white/15 backdrop-blur-lg shadow-lg border-b border-white/30 items-center"
            : "bg-white shadow-xl items-center"
        }`}
      >
        <div className="mx-auto max-w-[1200px] w-full px-4 sm:px-6 lg:px-8 relative z-[101]">
          <div className="flex items-center justify-between py-3">
            {/* Logo and Address section */}
            <div className="flex items-center gap-4 lg:gap-20">
              <Logo />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex">
              <nav className="flex gap-5 items-center">
                <ul className="flex gap-10 font-semibold text-xl capitalize items-center">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.path}
                        className={`${
                          pathname === item.path
                            ? "border-b-3 border-[#8b2727] transition-all text-[#8b2727]"
                            : ""
                        } text-black cursor-pointer hover:text-[#8b2727] transition-all duration-300 transform hover:scale-105`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Mobile Menu Button and Cart */}
            <div className="flex items-center gap-4 lg:hidden">
              {/* Hamburger Menu Button */}
              <button
                onClick={toggleMenu}
                className="text-2xl text-gray-700 hover:text-red-900 transition-all duration-300 transform cursor-pointer focus:outline-none"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <FaBars
                    className={`absolute transition-all duration-300 ${
                      isMenuOpen
                        ? "opacity-0 rotate-180 scale-75"
                        : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <FaTimes
                    className={`absolute transition-all duration-300 ${
                      isMenuOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 rotate-180 scale-75"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
              isMenuOpen
                ? "max-h-[500px] opacity-100 pb-4 transform translate-y-0"
                : "max-h-0 opacity-0 transform -translate-y-4"
            }`}
          >
            {/* Navigation Links */}
            <nav className="pt-2">
              <ul className="flex flex-col gap-2 font-semibold text-lg capitalize">
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className={`transition-all duration-300 transform ${
                      isMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isMenuOpen
                        ? `${(index + 2) * 100}ms`
                        : "0ms",
                    }}
                  >
                    <Link
                      href={item.path}
                      onClick={closeMenu}
                      className={`${
                        pathname === item.path
                          ? "text-[#8b2727] border-l-4 border-[#d2af6f] pl-4 bg-red-50"
                          : "text-black pl-4"
                      } block py-3 cursor-pointer hover:text-[#8b2727] hover:bg-gray-50 rounded-r-lg transition-all duration-300 hover:transform hover:translate-x-2 hover:shadow-md`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-[80px] sm:h-[88px] lg:h-[92px]"></div>
    </>
  );
};

export default Navbar;
