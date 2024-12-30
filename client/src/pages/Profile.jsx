import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/user/getUserData",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success && res.data.data) {
          setUserData(res.data.data);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <Navbar userName={userData?.name} userRole={userData?.role || "User"} />
      <main style={styles.main}>
        <div style={styles.profileCard}>
          <h1 style={styles.title}>Profile</h1>
          <div style={styles.avatarContainer}>
            <div style={styles.avatar}>
              {userData?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
          <div style={styles.infoContainer}>
            <div style={styles.infoItem}>
              <label style={styles.label}>Name</label>
              <p style={styles.value}>{userData?.name || "N/A"}</p>
            </div>
            <div style={styles.infoItem}>
              <label style={styles.label}>Email</label>
              <p style={styles.value}>{userData?.email || "N/A"}</p>
            </div>
            <div style={styles.infoItem}>
              <label style={styles.label}>Role</label>
              <p style={styles.value}>
                {userData?.role ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) : "User"}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    flex: 1,
    backgroundColor: "#fbcfe8",
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "2rem",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "2rem",
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  avatar: {
    width: "100px",
    height: "100px",
    backgroundColor: "#75C9D6",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2.5rem",
    color: "#ffffff",
    fontWeight: "bold",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.9rem",
    color: "#666666",
    fontWeight: "500",
  },
  value: {
    fontSize: "1.1rem",
    color: "#2c3e50",
    padding: "0.5rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
    margin: 0,
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "1.2rem",
    color: "#666666",
  },
  error: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    color: "#dc3545",
    fontSize: "1.2rem",
  },
};

export default Profile;
