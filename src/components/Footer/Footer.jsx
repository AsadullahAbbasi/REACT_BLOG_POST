import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <section className="py-10 border-t-2 border-t-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center text-center sm:text-left">
          <div className="w-full">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4 flex  justify-center">
                <img src="../../../public/react.png" alt="Logo" className="w-20 h-20" />
              </div>
             
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">Company</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                  Features
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                  Pricing
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">Support</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                  Account
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                  Help
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">Legals</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
                <p className="text-sm text-gray-600 text-center mt-7">
                  &copy; 2023. All Rights Reserved by DevUI.
                </p>
              </div>
      </div>
    </section>
  );
}

export default Footer;
