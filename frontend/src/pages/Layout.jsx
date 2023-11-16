import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="bg-stone-100 h-full justify-between min-h-screen flex flex-col">
        <Navbar />
        <div className=" font-fontInter">{children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
