import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--tertiary-color);
  color: #fff;
  padding: 3rem 0;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: var(--secondary-color);
    }
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #fff;
    color: var(--tertiary-color);
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--secondary-color);
      color: var(--tertiary-color);
    }
  }
`;

const BottomFooter = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 2rem 1rem 0;

  p {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About Us</h3>
          <p>
            Listingz is your premier destination for finding and listing property. We connect buyers and sellers to create seamless real estate transactions.
          </p>
          <SocialIcons>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </SocialIcons>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/properties">Properties</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Property Types</h3>
          <ul>
            <li>
              <Link to="/properties?propertyType=House">Houses</Link>
            </li>
            <li>
              <Link to="/properties?propertyType=Apartment">Apartments</Link>
            </li>
            <li>
              <Link to="/properties?propertyType=Condo">Condos</Link>
            </li>
            <li>
              <Link to="/properties?propertyType=Land">Land</Link>
            </li>
            <li>
              <Link to="/properties?propertyType=Commercial">Commercial</Link>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contact Info</h3>
          <p>
            <i className="fas fa-map-marker-alt"></i> 123 Real Estate Street, City, Country
          </p>
          <p>
            <i className="fas fa-phone"></i> +1 234 567 8900
          </p>
          <p>
            <i className="fas fa-envelope"></i> info@listingz.com
          </p>
          <p>
            <i className="fas fa-clock"></i> Mon - Fri: 9:00 AM - 5:00 PM
          </p>
        </FooterSection>
      </FooterContent>
      <BottomFooter>
        <p>&copy; {new Date().getFullYear()} Listingz. All rights reserved.</p>
      </BottomFooter>
    </FooterContainer>
  );
};

export default Footer; 