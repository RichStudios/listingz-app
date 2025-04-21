import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  color: var(--tertiary-color);
  margin-bottom: 20px;
`;

const About = () => {
  return (
    <Container>
      <Title>About Us</Title>
      <p>Listingz is your premier destination for finding and listing property. We connect buyers and sellers to create seamless real estate transactions.</p>
    </Container>
  );
};

export default About; 