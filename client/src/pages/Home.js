import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import PropertyCard from '../components/properties/PropertyCard';

const HeroSection = styled.section`
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 0;
  text-align: center;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchBox = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: var(--dark-color);
  font-weight: 500;
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-end;
  
  &:hover {
    background-color: #cf1920;
  }
`;

const Section = styled.section`
  padding: 60px 0;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 15px;
  color: var(--tertiary-color);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ViewMoreButton = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 40px;
  padding: 12px 30px;
  background-color: transparent;
  color: var(--tertiary-color);
  border: 2px solid var(--tertiary-color);
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  
  &:hover {
    background-color: var(--tertiary-color);
    color: white;
  }
`;

const FeaturesSection = styled.section`
  background-color: #f7f9f9;
  padding: 80px 0;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  text-align: center;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  
  i {
    font-size: 30px;
    color: var(--tertiary-color);
  }
`;

const FeatureTitle = styled.h3`
  margin-bottom: 15px;
  color: var(--tertiary-color);
`;

const FeatureDescription = styled.p`
  color: #666;
`;

const CTASection = styled.section`
  background-image: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/assets/images/cta-bg.jpg');
  background-size: cover;
  background-position: center;
  padding: 80px 0;
  color: white;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 15px 40px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1.1rem;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #cf1920;
    color: white;
  }
`;

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const res = await axios.get('/api/properties/featured');
        setFeaturedProperties(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured properties:', err);
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <>
      <HeroSection>
        <HeroContainer>
          <HeroTitle>Find Your Dream Property</HeroTitle>
          <HeroSubtitle>
            Discover the perfect property for your needs with our extensive listings of houses, apartments, and commercial properties.
          </HeroSubtitle>
          
          <SearchBox>
            <SearchForm>
              <FormGroup>
                <Label>Property Type</Label>
                <Select>
                  <option value="">All Types</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condo">Condo</option>
                  <option value="Land">Land</option>
                  <option value="Commercial">Commercial</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Location</Label>
                <Select>
                  <option value="">Any Location</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                  <option value="Houston">Houston</option>
                  <option value="Miami">Miami</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Price Range</Label>
                <Select>
                  <option value="">Any Price</option>
                  <option value="0-100000">$0 - $100,000</option>
                  <option value="100000-300000">$100,000 - $300,000</option>
                  <option value="300000-500000">$300,000 - $500,000</option>
                  <option value="500000-1000000">$500,000 - $1,000,000</option>
                  <option value="1000000+">$1,000,000+</option>
                </Select>
              </FormGroup>
              
              <Button type="submit">Search</Button>
            </SearchForm>
          </SearchBox>
        </HeroContainer>
      </HeroSection>

      <Section>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>Featured Properties</SectionTitle>
            <SectionSubtitle>
              Browse our selection of handpicked premium properties from around the country
            </SectionSubtitle>
          </SectionHeader>
          
          <PropertiesGrid>
            {loading ? (
              <p>Loading properties...</p>
            ) : featuredProperties.length > 0 ? (
              featuredProperties.map(property => (
                <PropertyCard key={property._id} property={property} />
              ))
            ) : (
              <p>No featured properties found.</p>
            )}
          </PropertiesGrid>
          
          <ViewMoreButton to="/properties">View All Properties</ViewMoreButton>
        </SectionContainer>
      </Section>

      <FeaturesSection>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>Why Choose Us</SectionTitle>
            <SectionSubtitle>
              We provide exceptional service and value to our clients
            </SectionSubtitle>
          </SectionHeader>
          
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>
                <i className="fas fa-home"></i>
              </FeatureIcon>
              <FeatureTitle>Wide Range of Properties</FeatureTitle>
              <FeatureDescription>
                Browse through thousands of properties to find the perfect match for your needs and budget.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <i className="fas fa-dollar-sign"></i>
              </FeatureIcon>
              <FeatureTitle>Best Price Guarantee</FeatureTitle>
              <FeatureDescription>
                We work with trusted sellers to ensure you're getting the best value for your investment.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <i className="fas fa-user-tie"></i>
              </FeatureIcon>
              <FeatureTitle>Expert Support</FeatureTitle>
              <FeatureDescription>
                Our experienced team is ready to guide you through every step of your property journey.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </SectionContainer>
      </FeaturesSection>

      <CTASection>
        <SectionContainer>
          <CTATitle>Ready to Sell Your Property?</CTATitle>
          <CTADescription>
            Join thousands of satisfied clients who have successfully sold their properties through our platform.
          </CTADescription>
          <CTAButton to="/register">Get Started Today</CTAButton>
        </SectionContainer>
      </CTASection>
    </>
  );
};

export default Home; 