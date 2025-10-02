import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import siteBg from "../../images/website bg for all pages.png";

const Layout = () => {
  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${siteBg})`,
      }}
    >
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
