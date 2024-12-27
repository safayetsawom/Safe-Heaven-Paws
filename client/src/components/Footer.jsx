import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <div style={styles.section}>
          <h3>SAFE HEAVEN PAWS</h3>
          <p> <h3> Rescue. Care. Connect. </h3></p>
        </div>
        <div style={styles.section}>
          <h4>Contact Us</h4>
          <p>Email: Noemail@heavenpaw.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div style={styles.section}>
          <h4>Follow Us On</h4>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
        </div>
      </div>
      {/* <div style={styles.bottom}>
        <p>&copy; 2024 Heaven Paw. All rights reserved.</p>
      </div> */}
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#75C9D6',
    color: 'black',
    padding: '2rem 0',
    marginTop: 'auto',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 10,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  section: {
    flex: 1,
    margin: '0 1rem',
  },
  bottom: {
    textAlign: 'center',
    marginTop: '-2rem',
    padding: '1rem 0',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
};

export default Footer; 