import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <div style={styles.section}>
          <h3>Safe Heaven Paws🐾</h3>
          <p>Rescue, Care, Connect.</p>
        </div>
        <div style={styles.section}>
          <h4>Contact Us</h4>
          <p>💌 Email: safeheavenpaws@yahoo.com</p>
          <p>📞 Phone: (123) 456-7890</p>
        </div>
        <div style={styles.socialSection}>
          <h4>Follow Us On</h4>
          <div style={styles.socialLinks}>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#75C9D6',
    color: 'black',
    padding: '1rem 0',
    width: '100%',
    textAlign: 'center',
    marginTop: 'auto',
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
  socialSection: {
    flex: 1,
    margin: '0 1rem',
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    marginTop: '0.5rem',
  },
};

export default Footer;
