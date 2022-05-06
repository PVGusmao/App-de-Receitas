import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileCard from '../components/ProfileCard';

function Profile() {
  return (
    <>
      <Header title="Profile" />
      <ProfileCard />
      <Footer />
    </>
  );
}

export default Profile;
