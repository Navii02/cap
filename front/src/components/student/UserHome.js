import React from 'react';
import '../../App.css';
import HeroSection from './HeroSection';

import Cards from './Cards';
import UserNavbar from './UserNavbar';

function UserHome() {
  return (
    <>
      <UserNavbar/>
      <HeroSection/>
      <Cards/>
  
    </>
  );
}

export default UserHome;