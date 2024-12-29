import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Donation = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [donationAmount, setDonationAmount] = useState(2000);
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [donationRequests, setDonationRequests] = useState([]);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: ''
  });
  const [requestDetails, setRequestDetails] = useState({
    name: '',
    reason: '',
    amountNeeded: '',
    contact: ''
  });

  // Get user data for Navbar
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

  const getDonationAmount = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/donation/balance");
      setDonationAmount(res.data.balance);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserRequests = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/donation/user-requests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDonationRequests(res.data.requests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getUserData();
      getDonationAmount();
      getUserRequests();
    }
  }, []);

  const handleDonate = async () => {
    try {
      // Check if all fields are filled
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.amount) {
        return message.error('Please fill all card details');
      }

      // Check CVV length
      if (cardDetails.cvv.length !== 3) {
        return message.error('CVV must be 3 digits');
      }

      // Check if CVV contains only numbers
      if (!/^\d{3}$/.test(cardDetails.cvv)) {
        return message.error('CVV must contain only numbers');
      }
      
      // If validation passes, process donation
      setDonationAmount(prev => prev + Number(cardDetails.amount));
      message.success('Donation successful!');
      setShowDonateForm(false);
      setCardDetails({ cardNumber: '', expiryDate: '', cvv: '', amount: '' });
    } catch (error) {
      console.log(error);
      message.error('Error processing donation');
    }
  };

  const handleRequest = async () => {
    try {
      const requestData = {
        ...requestDetails
      };

      const res = await axios.post(
        "http://localhost:8080/api/v1/donation/request",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (res.data.success) {
        message.success('Request submitted for approval');
        setShowRequestForm(false);
        setRequestDetails({ name: '', reason: '', amountNeeded: '', contact: '' });
        getUserRequests();
      }
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || 'Error submitting request');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <div>
      <Navbar 
        userName={userData?.name}
        onLogout={handleLogout}
        userRole={userData?.role}
      />
      <div style={styles.container}>
        <h2 style={styles.title}>Donation Center</h2>
        
        <div style={styles.balanceCard}>
          <h3>Current Donation Balance</h3>
          <p style={styles.amount}>৳{donationAmount}</p>
        </div>

        <div style={styles.buttonGroup}>
          <button 
            style={styles.button} 
            onClick={() => setShowDonateForm(true)}
          >
            Make a Donation
          </button>
          <button 
            style={styles.button} 
            onClick={() => setShowRequestForm(true)}
          >
            Request Donation
          </button>
        </div>

        {showDonateForm && (
          <div style={styles.formCard}>
            <h3>Make a Donation</h3>
            <input
              style={styles.input}
              type="text"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
            />
            <input
              style={styles.input}
              type="text"
              placeholder="MM/YY"
              value={cardDetails.expiryDate}
              onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
            />
            <input
              style={styles.input}
              type="text"
              placeholder="CVV"
              maxLength="3"
              value={cardDetails.cvv}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setCardDetails({...cardDetails, cvv: value})
              }}
            />
            <input
              style={styles.input}
              type="number"
              placeholder="Amount"
              value={cardDetails.amount}
              onChange={(e) => setCardDetails({...cardDetails, amount: e.target.value})}
            />
            <button style={styles.submitButton} onClick={handleDonate}>
              Submit Donation
            </button>
          </div>
        )}

        {showRequestForm && (
          <div style={styles.formCard}>
            <h3>Request Donation</h3>
            <input
              style={styles.input}
              type="text"
              placeholder="Your Name"
              value={requestDetails.name}
              onChange={(e) => setRequestDetails({...requestDetails, name: e.target.value})}
            />
            <textarea
              style={styles.textarea}
              placeholder="Reason for Request"
              value={requestDetails.reason}
              onChange={(e) => setRequestDetails({...requestDetails, reason: e.target.value})}
            />
            <input
              style={styles.input}
              type="number"
              placeholder="Amount Needed"
              value={requestDetails.amountNeeded}
              onChange={(e) => setRequestDetails({...requestDetails, amountNeeded: e.target.value})}
            />
            <input
              style={styles.input}
              type="text"
              placeholder="Contact Information"
              value={requestDetails.contact}
              onChange={(e) => setRequestDetails({...requestDetails, contact: e.target.value})}
            />
            <button style={styles.submitButton} onClick={handleRequest}>
              Submit Request
            </button>
          </div>
        )}

        {/* Display user's requests */}
        <div style={styles.requestsSection}>
          <h3>Your Donation Requests</h3>
          {donationRequests.map((request) => (
            <div key={request._id} style={styles.requestCard}>
              <h4>Amount Requested: ৳{request.amountNeeded}</h4>
              <p>Reason: {request.reason}</p>
              <p>Status: {request.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    marginTop: '70px',
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '2rem',
  },
  balanceCard: {
    backgroundColor: '#fbcfe8',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  amount: {
    fontSize: '2rem',
    color: '#1890ff',
    fontWeight: 'bold',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  formCard: {
    backgroundColor: '#fbcfe8',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    minHeight: '100px',
  },
  submitButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  requestsSection: {
    marginTop: '2rem',
  },
  requestCard: {
    backgroundColor: '#24ceec',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  }
};

export default Donation; 