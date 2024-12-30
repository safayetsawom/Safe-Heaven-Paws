import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/blogs/');
        if (response.data.success) {
          setBlogs(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

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
          setUserData(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchBlogs();
    fetchUserData();
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
      console.log('Submitting blog data:', formData);

      const response = await axios.post(
        'http://localhost:8080/api/v1/blogs/create',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        }
      );
      
      console.log('Server response:', response.data);

      if (response.data.success) {
        setBlogs([response.data.data, ...blogs]);
        window.alert('Blog posted successfully!');
        setIsModalOpen(false);
        setFormData({ title: '', content: '' });
      } else {
        throw new Error(response.data.message || 'Failed to create blog');
      }
    } catch (error) {
      console.error('Full error object:', error);
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
      window.alert('Failed to post blog: ' + errorMessage);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div style={styles.container}>
      <Navbar userName={userData?.name} userRole={userData?.role} />
      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Blog Posts 📝</h1>
          <button onClick={() => setIsModalOpen(true)} style={styles.button}>
            Write a Blog
          </button>
        </div>
        <div style={styles.blogsContainer}>
          {blogs.map((blog) => (
            <div key={blog._id} style={styles.blog}>
              <div style={styles.blogContent}>
                <h2 style={styles.blogTitle}>{blog.title}</h2>
                <p style={styles.blogAuthor}>
                  Written by {blog.authorName} on {formatDate(blog.createdAt)}
                </p>
                <p style={styles.blogText}>{blog.content}</p>
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <div style={styles.noBlogs}>
              <p>No blog posts yet.</p>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <button onClick={() => setIsModalOpen(false)} style={styles.closeButton}>
                ✖ Close
              </button>
              <h2 style={styles.subtitle}>Write a New Blog Post ✍️</h2>
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Blog Title"
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Content</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your blog content here..."
                    style={styles.textarea}
                    required
                    rows={10}
                  />
                </div>
                <button type="submit" style={styles.submitButton}>
                  Publish Blog
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
  blogsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  blog: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  blogContent: {
    padding: '1.5rem',
  },
  blogTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#2c3e50',
  },
  blogAuthor: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  blogText: {
    lineHeight: '1.6',
    color: '#2c3e50',
    whiteSpace: 'pre-wrap',
  },
  noBlogs: {
    textAlign: 'center',
    padding: '2rem',
    color: '#7f8c8d',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflow: 'auto',
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '200px',
  },
  submitButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#75C9D6',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    alignSelf: 'flex-end',
  },
};

export default Blog; 