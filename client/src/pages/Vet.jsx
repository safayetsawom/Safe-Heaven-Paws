import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Vet = () => {
  const [userData, setUserData] = useState(null);
  const [vets, setVets] = useState([]);
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    specialization: '',
    contact: '',
  });
  const navigate = useNavigate();

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
        if (res.data.success) {
          setUserData(res.data.data);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };

    const fetchVets = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/vets');
        setVets(response.data);
      } catch (error) {
        console.error('Error fetching vets:', error);
      }
    };

    fetchUserData();
    fetchVets();
  }, [navigate]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const filteredVets = vets.filter((vet) =>
    vet.location.toLowerCase().includes(filter)
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      location: '',
      specialization: '',
      contact: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/vets/create', formData);
      setVets([...vets, response.data]); // Update frontend state with the new vet
      handleCloseModal();
      alert('Vet added successfully!');
    } catch (error) {
      alert('Failed to add vet');
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar
        userName={userData?.name}
        userRole={userData?.role}
        onLogout={() => {
          localStorage.clear();
          navigate('/login');
        }}
      />
      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Veterinarians 👨‍⚕️</h1>
          <button style={styles.requestButton} onClick={handleOpenModal}>
            Request to Add a Vet
          </button>
        </div>
        <div style={styles.filterContainer}>
          <input
            type="text"
            placeholder="Filter by location"
            value={filter}
            onChange={handleFilterChange}
            style={styles.input}
          />
        </div>
        <div style={styles.vetsContainer}>
          {filteredVets.map((vet) => (
            <div key={vet._id} style={styles.vetCard}>
              <h2 style={styles.vetName}>{vet.name}</h2>
              <p style={styles.vetDetails}>📍 Location: {vet.location}</p>
              <p style={styles.vetDetails}>🩺 Specialization: {vet.specialization}</p>
              <p style={styles.vetDetails}>📞 Contact: {vet.contact}</p>
            </div>
          ))}
          {filteredVets.length === 0 && (
            <div style={styles.noVets}>
              <p>No veterinarians found. Try a different location!</p>
            </div>
          )}
        </div>
        {isModalOpen && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <button style={styles.closeButton} onClick={handleCloseModal}>
                ✖
              </button>
              <h2 style={styles.modalTitle}>Request to Add a Vet</h2>
              <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                </div>
                <button type="submit" style={styles.submitButton}>
                  Add Vet
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fbcfe8',
    color: '#333',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#d7263d',
  },
  requestButton: {
    backgroundColor: '#6b2737',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '50%',
  },
  vetsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  vetCard: {
    backgroundColor: '#fff',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  vetName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#6b2737',
  },
  vetDetails: {
    margin: '5px 0',
    color: '#555',
  },
  noVets: {
    textAlign: 'center',
    color: '#777',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure modal is above footer
    overflowY: 'auto', // Allow scrolling if content overflows
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    width: '400px',
    maxHeight: '90vh', // Prevent the modal from exceeding screen height
    overflowY: 'auto', // Add scroll for content within the modal
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    position: 'relative',
  },

  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    color: '#d7263d',
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  modalTitle: {
    marginBottom: '20px',
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#d7263d',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#d7263d',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default Vet;
