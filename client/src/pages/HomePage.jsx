import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/getUserData", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (res.data.success) {
        setUserData(res.data.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getUserData();
    }
  }, []);

  return (
    <div style={styles.container}>
      <Navbar userName={userData?.name} onLogout={handleLogout} />
      
      <main style={styles.main}>
        <div style={styles.welcomeSection}>
          <h1 style={styles.welcomeText}>
            Welcome {userData?.name} to the SAFE HEAVEN PAWS
          </h1>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: 1,
    backgroundColor: '#fbcfe8',
    padding: '2rem',
  },
  welcomeSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 1rem',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '2rem',
  },
};

export default HomePage; 