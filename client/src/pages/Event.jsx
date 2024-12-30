import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
  });
  const [userData, setUserData] = useState(null); // To store user data
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch events from backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const res = await axios.post(
          'http://localhost:8080/api/v1/user/getUserData',
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (res.data.success) {
          setUserData(res.data.data); // Set user data
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchEvents();
    fetchUserData(); // Fetch user data
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/events/create', 
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}` // Add token if required
          }
        }
      );
      
      if (response.data.success) {
        setEvents([...events, response.data.data]);
        window.alert('Event submitted successfully!');
        setIsModalOpen(false);
        setFormData({
          title: '',
          date: '',
          location: '',
          description: '',
        });
      } else {
        window.alert(`Failed to submit event: ${response.data.message}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
      window.alert(`Failed to submit event: ${errorMessage}`);
      console.error('Error submitting event:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
    });
  };

  return (
    <div style={styles.container}>
      <Navbar
        userName={userData?.name} // Pass the username to Navbar
        userRole={userData?.role} // Optionally pass the role
      />
      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Upcoming Events 🎉</h1>
          <button onClick={handleOpenModal} style={styles.button}>
            Create a New Event
          </button>
        </div>
        <div style={styles.eventsContainer}>
          {events.map((event) => (
            <div key={event._id} style={styles.event}>
              <div style={styles.eventContent}>
                <h2 style={styles.eventTitle}>{event.title}</h2>
                <p style={styles.eventDate}>Date: {event.date}</p>
                <p style={styles.eventLocation}>Location: {event.location}</p>
                <p style={styles.eventDescription}>{event.description}</p>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <div style={styles.noEvents}>
              <p>No upcoming events yet.</p>
            </div>
          )}
        </div>
        {isModalOpen && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <button onClick={handleCloseModal} style={styles.closeButton}>
                ✖ Close
              </button>
              <h2 style={styles.subtitle}>Submit a New Event 🎉</h2>
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Event Title"
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Event Location"
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Event Description"
                    style={styles.textarea}
                    required
                  />
                </div>
                <button type="submit" style={styles.submitButton}>
                  Create Event
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
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: 1,
    backgroundColor: '#fbcfe8',
    padding: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '3rem',
    color: '#2c3e50',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#75C9D6',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  eventsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
  },
  event: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  eventContent: {
    padding: '1rem',
  },
  eventTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  eventDate: {
    color: '#7f8c8d',
    marginBottom: '0.5rem',
  },
  eventLocation: {
    color: '#7f8c8d',
    marginBottom: '0.5rem',
  },
  eventDescription: {
    marginBottom: '1rem',
  },
  noEvents: {
    textAlign: 'center',
    padding: '2rem',
    color: '#7f8c8d',
  },
  modal: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'auto',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    margin: '1rem',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  submitButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#75C9D6',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    alignSelf: 'center',
    transition: 'background-color 0.3s',
  },
};

export default Event;
