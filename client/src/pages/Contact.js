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

const Contact = () => {
  return (
    <Container>
      <Title>Contact Us</Title>
      <p>Get in touch with our team for any inquiries about properties or services.</p>
    </Container>
  );
};

export default Contact; 