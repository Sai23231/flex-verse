import React from 'react';
import { Box } from '@mui/material';
import { about } from '../assets';

const About: React.FC = () => {
  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(72, 156, 242, 0.8), rgba(0, 0, 0, 0.8)), url(${about})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    color: '#fff',
  };

  const contentStyle = {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontSize: '1.2rem',
    lineHeight: '1.5',
  };

  const linkStyle = {
    color: '#ffb600',
    textDecoration: 'none',
  };

  return (
    <Box sx={{ ...sectionStyle }}>
      <Box sx={{ ...contentStyle }}>
        <h1>About Our App</h1>
        <p>
          Welcome to FlexVerse, where fitness meets convenience. We are
          passionate about helping you achieve your fitness goals by connecting
          you with experienced fitness professionals who can guide and support
          you on your journey to a healthier lifestyle.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is to make fitness accessible to everyone, regardless of
          their location or schedule. We believe that with the right guidance
          and support, anyone can reach their fitness goals and lead a happier,
          healthier life.
        </p>
        <h2>How It Works</h2>
        <p>
          FlexVerse makes it easy to find and connect with certified fitness
          trainers and dietitians in your area. Simply create an account, browse
          through our network of professionals, and choose the one that best
          fits your needs and preferences. From personalized workout plans to
          expert nutritional advice, our professionals are here to help you
          every step of the way.
        </p>
        <h2>Meet Our Team</h2>
        <p>
          Behind FlexVerse is a team of dedicated individuals who are passionate
          about fitness and technology. From developers to fitness enthusiasts,
          we are committed to providing you with the best possible experience on
          your fitness journey.
        </p>
        <h2>Contact Us</h2>
        <p>
          Have questions or feedback? We'd love to hear from you! Reach out to
          us at{' '}
          <a href="mailto:admin@flex-verse.com" style={linkStyle}>
            admin@flex-verse.com
          </a>{' '}
          and we'll get back to you as soon as possible.
        </p>
      </Box>
    </Box>
  );
};

export default About;
