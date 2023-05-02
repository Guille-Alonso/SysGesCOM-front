import React from 'react';
import Navbar from './Navbar/Navbar';

const Layout = ({children}) => {
    return (   
    <>
    <Navbar />
        {children}
    {/* FooterComponent */}
    </> 
    );
}

export default Layout;