import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  color: var(--tertiary-color);
  margin-bottom: 20px;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const Filter = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  margin-bottom: 10px;
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

const PropertyCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const PropertyImage = styled.div`
  height: 200px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;

const PropertyInfo = styled.div`
  padding: 20px;
`;

const PropertyTitle = styled.h3`
  margin-bottom: 10px;
  color: var(--secondary-color);
`;

const PropertyPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 10px;
`;

const PropertyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const PropertyDetail = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
`;

const ViewButton = styled(Link)`
  display: block;
  text-align: center;
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  
  &:hover {
    background-color: #cf1920;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 8px 15px;
  border: ${props => props.active ? 'none' : '1px solid #ddd'};
  background-color: ${props => props.active ? 'var(--primary-color)' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '#cf1920' : '#f5f5f5'};
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
`;

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulating API call
    setLoading(true);
    
    // In a real app, you would fetch from your backend:
    // axios.get('/api/properties')
    //   .then(res => {
    //     setProperties(res.data.data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     console.error('Error fetching properties:', err);
    //     setLoading(false);
    //   });
    
    // Mock data
    setTimeout(() => {
      const mockProperties = [
        {
          id: 1,
          title: 'Modern Apartment in Downtown',
          price: 350000,
          type: 'Apartment',
          bedrooms: 2,
          bathrooms: 2,
          area: 1200,
          location: 'Downtown',
          image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        },
        {
          id: 2,
          title: 'Luxury Villa with Pool',
          price: 1250000,
          type: 'House',
          bedrooms: 5,
          bathrooms: 4,
          area: 3500,
          location: 'Suburbs',
          image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        },
        {
          id: 3,
          title: 'Cozy Studio near University',
          price: 180000,
          type: 'Studio',
          bedrooms: 1,
          bathrooms: 1,
          area: 500,
          location: 'University District',
          image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        },
        {
          id: 4,
          title: 'Spacious Family Home',
          price: 550000,
          type: 'House',
          bedrooms: 4,
          bathrooms: 3,
          area: 2200,
          location: 'Suburbs',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        },
        {
          id: 5,
          title: 'Waterfront Penthouse',
          price: 975000,
          type: 'Penthouse',
          bedrooms: 3,
          bathrooms: 3,
          area: 1800,
          location: 'Waterfront',
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        },
        {
          id: 6,
          title: 'Mountain View Cottage',
          price: 425000,
          type: 'House',
          bedrooms: 2,
          bathrooms: 1,
          area: 1000,
          location: 'Mountain Area',
          image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        }
      ];
      
      setProperties(mockProperties);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter properties based on user selections
  const filteredProperties = properties.filter(property => {
    // Price filter
    if (priceFilter === 'low' && property.price > 300000) return false;
    if (priceFilter === 'medium' && (property.price <= 300000 || property.price > 600000)) return false;
    if (priceFilter === 'high' && property.price <= 600000) return false;
    
    // Type filter
    if (typeFilter !== 'all' && property.type !== typeFilter) return false;
    
    // Location filter
    if (locationFilter !== 'all' && property.location !== locationFilter) return false;
    
    // Search term
    if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });

  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Container>
      <Title>Property Listings</Title>
      
      <FiltersContainer>
        <div>
          <Filter value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
            <option value="all">All Prices</option>
            <option value="low">Under $300,000</option>
            <option value="medium">$300,000 - $600,000</option>
            <option value="high">Over $600,000</option>
          </Filter>
          
          <Filter value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Property Types</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Studio">Studio</option>
            <option value="Penthouse">Penthouse</option>
          </Filter>
          
          <Filter value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="all">All Locations</option>
            <option value="Downtown">Downtown</option>
            <option value="Suburbs">Suburbs</option>
            <option value="University District">University District</option>
            <option value="Waterfront">Waterfront</option>
            <option value="Mountain Area">Mountain Area</option>
          </Filter>
        </div>
        
        <SearchInput 
          type="text" 
          placeholder="Search properties..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FiltersContainer>
      
      {loading ? (
        <LoadingMessage>Loading properties...</LoadingMessage>
      ) : (
        <>
          <PropertiesGrid>
            {filteredProperties.map(property => (
              <PropertyCard key={property.id}>
                <PropertyImage src={property.image} />
                <PropertyInfo>
                  <PropertyTitle>{property.title}</PropertyTitle>
                  <PropertyPrice>{formatPrice(property.price)}</PropertyPrice>
                  <PropertyDetails>
                    <PropertyDetail>{property.bedrooms} Beds</PropertyDetail>
                    <PropertyDetail>{property.bathrooms} Baths</PropertyDetail>
                    <PropertyDetail>{property.area} sq ft</PropertyDetail>
                  </PropertyDetails>
                  <PropertyDetail style={{ marginBottom: '15px' }}>{property.location}</PropertyDetail>
                  <ViewButton to={`/properties/${property.id}`}>View Property</ViewButton>
                </PropertyInfo>
              </PropertyCard>
            ))}
          </PropertiesGrid>
          
          {filteredProperties.length > 0 ? (
            <Pagination>
              <PageButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</PageButton>
              {[...Array(Math.min(3, Math.ceil(filteredProperties.length / 6)))].map((_, index) => (
                <PageButton 
                  key={index} 
                  active={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PageButton>
              ))}
              <PageButton 
                onClick={() => setCurrentPage(Math.ceil(filteredProperties.length / 6))} 
                disabled={currentPage === Math.ceil(filteredProperties.length / 6)}
              >
                Last
              </PageButton>
            </Pagination>
          ) : (
            <LoadingMessage>No properties found matching your criteria</LoadingMessage>
          )}
        </>
      )}
    </Container>
  );
};

export default PropertyListing; 