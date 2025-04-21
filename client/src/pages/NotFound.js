import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 100px auto;
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: var(--tertiary-color);
  margin-bottom: 20px;
  font-size: 3rem;
`;

const Message = styled.p`
  margin-bottom: 30px;
  font-size: 1.2rem;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  
  &:hover {
    background-color: #cf1920;
    color: white;
  }
`;

const NotFound = () => {
  return (
    <Container>
      <Title>404</Title>
      <Message>Oops! The page you're looking for doesn't exist.</Message>
      <HomeLink to="/">Go Back Home</HomeLink>
    </Container>
  );
};

export default NotFound; 