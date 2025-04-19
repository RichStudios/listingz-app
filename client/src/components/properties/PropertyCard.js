import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${({ status }) => 
    status === 'For Sale' 
      ? 'var(--primary-color)' 
      : status === 'For Rent' 
      ? 'var(--secondary-color)' 
      : status === 'Sold' 
      ? 'var(--tertiary-color)' 
      : '#999'};
  color: ${({ status }) => 
    status === 'For Rent' ? 'var(--dark-color)' : '#fff'};
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--secondary-color);
  color: var(--dark-color);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const FavoriteButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  color: ${({ isFavorite }) => 
    isFavorite ? 'var(--primary-color)' : '#999'};

  &:hover {
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  padding: 15px;
`;

const Price = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 10px;
`;

const Title = styled(Link)`
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--dark-color);
  margin-bottom: 10px;
  text-decoration: none;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const Address = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
`;

const Features = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
  padding-top: 15px;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #555;

  span {
    margin-left: 5px;
  }
`;

const PropertyCard = ({ property }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const isFavorite = user && user.favorites && user.favorites.includes(property._id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return;
    }

    try {
      await axios.put(`/api/properties/${property._id}/favorite`);
      // Update UI would be handled via context or state management
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  return (
    <Card>
      <ImageContainer>
        <Image
          src={property.images && property.images.length > 0 
            ? `/uploads/${property.images[0]}` 
            : '/assets/images/property-placeholder.jpg'}
          alt={property.title}
        />
        <StatusBadge status={property.status}>
          {property.status}
        </StatusBadge>
        {property.featured && <FeaturedBadge>Featured</FeaturedBadge>}
        {isAuthenticated && (
          <FavoriteButton 
            onClick={handleToggleFavorite} 
            isFavorite={isFavorite}
          >
            <i className={`${isFavorite ? 'fas' : 'far'} fa-heart`}></i>
          </FavoriteButton>
        )}
      </ImageContainer>
      <Content>
        <Price>{formatPrice(property.price)}</Price>
        <Title to={`/properties/${property._id}`}>{property.title}</Title>
        <Address>
          {property.address.city}, {property.address.state}
        </Address>
        <Features>
          <Feature>
            <i className="fas fa-bed"></i>
            <span>{property.bedrooms} Beds</span>
          </Feature>
          <Feature>
            <i className="fas fa-bath"></i>
            <span>{property.bathrooms} Baths</span>
          </Feature>
          <Feature>
            <i className="fas fa-vector-square"></i>
            <span>{property.area} ft²</span>
          </Feature>
        </Features>
      </Content>
    </Card>
  );
};

export default PropertyCard; 