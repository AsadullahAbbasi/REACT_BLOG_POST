import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigate = (slug) => {
    navigate(slug);
    setIsMobileMenuOpen(false); // Close the menu after navigation
  };

  return (
    <header className='w-full bg-white shadow-md'>
      <Container className='py-4 flex items-center justify-between'>
        <Link to='/' className='flex items-center px-2 lg:px-0'>
          <img src='/react.png'  alt='Logo' width='40px' height='40px' />
        </Link>
        {/* Mobile Menu Toggle Button */}
        <button
          className='md:hidden text-2xl p-2 focus:outline-none'
          onClick={handleToggleMenu}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? '  ✖  ' : '☰'}
        </button>
        {/* Desktop Menu */}
        <ul className='hidden md:flex md:items-center md:space-x-6'>
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigate(item.slug)}
                    className='block text-left px-4 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </Container>
      {/* Mobile Menu with Animation */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className='flex flex-col space-y-2 p-4'>
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigate(item.slug)}
                    className='w-full text-left px-4 py-2 duration-200 hover:bg-blue-100 rounded'
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
