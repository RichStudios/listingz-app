import React from 'react';
import { useParams } from 'react-router-dom';
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

const PropertyDetail = () => {
  const { id } = useParams();

  return (
    <Container>
      <Title>Property Details</Title>
      <p>Details for property ID: {id}</p>
    </Container>
  );
};

export default PropertyDetail; 