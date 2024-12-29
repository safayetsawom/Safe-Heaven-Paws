import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

const DonationApproval = () => {
  const [requests, setRequests] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getUserData();
      getRequests();
    }
  }, []);

  const getUserData = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/getUserData", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUserData(res.data.data);
        // Check if user is admin
        if(res.data.data.role !== 'admin') {
          message.error("Not authorized");
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
      navigate("/login");
    }
  };

  const getRequests = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/donation/requests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Requests data:", res.data); // Debug log
      if (res.data.success) {
        setRequests(res.data.requests);
      }
    } catch (error) {
      console.log("Error fetching requests:", error);
      message.error('Error fetching donation requests');
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/donation/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (res.data.success) {
        message.success('Request approved successfully');
        getRequests(); // Refresh the list
      }
    } catch (error) {
      console.log(error);
      message.error('Error approving request');
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/donation/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (res.data.success) {
        message.success('Request rejected successfully');
        getRequests(); // Refresh the list
      }
    } catch (error) {
      console.log(error);
      message.error('Error rejecting request');
    }
  };

  return (
    <div>
      <Navbar 
        userName={userData?.name}
        onLogout={() => {
          localStorage.clear();
          message.success("Logout Successfully");
          navigate("/login");
        }}
        userRole={userData?.role}
      />
      <div style={styles.container}>
        <h2 style={styles.title}>Donation Requests Approval</h2>
        {requests.length === 0 ? (
          <p style={styles.noRequests}>No donation requests found</p>
        ) : (
          <div style={styles.requestList}>
            {requests.map((request) => (
              <div key={request._id} style={styles.requestCard}>
                <div style={styles.requestInfo}>
                  <h3>{request.name}</h3>
                  <p><strong>Reason:</strong> {request.reason}</p>
                  <p><strong>Amount Needed:</strong> ৳{request.amountNeeded}</p>
                  <p><strong>Contact:</strong> {request.contact}</p>
                  <p><strong>Status:</strong> <span style={{
                    color: request.status === 'pending' ? '#f39c12' : 
                           request.status === 'approved' ? '#27ae60' : '#e74c3c'
                  }}>{request.status}</span></p>
                </div>
                {request.status === 'pending' && (
                  <div style={styles.buttonGroup}>
                    <button 
                      style={styles.approveButton}
                      onClick={() => handleApprove(request._id)}
                    >
                      Approve
                    </button>
                    <button 
                      style={styles.rejectButton}
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: '70px',
    backgroundColor: '#fbcfe8',
  },
  title: {
    color: '#333',
    marginBottom: '2rem',
  },
  requestList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  requestCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  requestInfo: {
    marginBottom: '1rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
  },
  approveButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#52c41a',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  rejectButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  noRequests: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.1rem',
    marginTop: '2rem'
  }
};

export default DonationApproval;