import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  color: var(--tertiary-color);
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-top: 20px;
    width: 100%;
    justify-content: space-between;
  }
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 15px;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;

const UserEmail = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const DashboardContent = styled.div`
  display: flex;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  margin-right: 30px;
  
  @media (max-width: 992px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 30px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  min-height: 500px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 25px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const MenuItem = styled.li`
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px;
  background: ${props => props.active ? '#f5f5f5' : 'white'};
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? 'var(--primary-color)' : '#333'};
  
  &:hover {
    background: #f5f5f5;
  }
  
  svg {
    margin-right: 10px;
    color: ${props => props.active ? 'var(--primary-color)' : '#666'};
  }
`;

const StatusCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.bgColor || 'var(--primary-color)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const StatusInfo = styled.div`
  flex: 1;
  margin-left: 15px;
`;

const StatusTitle = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const StatusValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--secondary-color);
  margin-bottom: 20px;
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const PropertyCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const PropertyImage = styled.div`
  height: 150px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const PropertyStatus = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${props => props.status === 'Active' ? '#28a745' : 
    props.status === 'Pending' ? '#ffc107' : '#dc3545'};
  color: white;
  font-size: 0.8rem;
  padding: 3px 10px;
  border-radius: 20px;
`;

const PropertyInfo = styled.div`
  padding: 15px;
`;

const PropertyPrice = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: var(--primary-color);
`;

const PropertyAddress = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
`;

const PropertyMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #999;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  background: ${props => props.primary ? 'var(--primary-color)' : '#f5f5f5'};
  color: ${props => props.primary ? 'white' : '#333'};
  
  &:hover {
    opacity: 0.9;
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MessageItem = styled.div`
  display: flex;
  padding: 15px;
  border-radius: 8px;
  background: ${props => props.unread ? '#f0f7ff' : '#f9f9f9'};
  border-left: 3px solid ${props => props.unread ? 'var(--primary-color)' : '#ddd'};
`;

const MessageAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 15px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;

const MessageContent = styled.div`
  flex: 1;
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const MessageSender = styled.div`
  font-weight: ${props => props.unread ? 'bold' : 'normal'};
`;

const MessageTime = styled.div`
  font-size: 0.8rem;
  color: #999;
`;

const MessagePreview = styled.div`
  font-size: 0.9rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoItems = styled.div`
  padding: 30px;
  text-align: center;
  color: #999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: #cf1920;
  }
`;

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data
  const savedProperties = [
    {
      id: 1,
      title: 'Modern Apartment in Downtown',
      price: 350000,
      address: '123 Main St, Downtown',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      bedrooms: 2,
      bathrooms: 2
    },
    {
      id: 2,
      title: 'Luxury Villa with Pool',
      price: 1250000,
      address: '456 Ocean Dr, Beachside',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      bedrooms: 5,
      bathrooms: 4
    }
  ];
  
  const myListings = [
    {
      id: 3,
      title: 'Cozy Studio near University',
      price: 180000,
      address: '789 College Ave, University District',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      bedrooms: 1,
      bathrooms: 1,
      status: 'Active',
      views: 52
    },
    {
      id: 4,
      title: 'Spacious Family Home',
      price: 550000,
      address: '101 Maple St, Suburbs',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      bedrooms: 4,
      bathrooms: 3,
      status: 'Pending',
      views: 28
    }
  ];
  
  const messages = [
    {
      id: 1,
      sender: 'John Smith',
      message: 'I am interested in your listing at 789 College Ave. Is it still available for viewing this weekend?',
      time: '2 hours ago',
      unread: true,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      sender: 'Sarah Johnson',
      message: 'Thank you for the information about the property. I would like to make an offer.',
      time: 'Yesterday',
      unread: false,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 3,
      sender: 'Michael Chen',
      message: 'Are utilities included in the rent for the apartment on Main St?',
      time: '3 days ago',
      unread: false,
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
    }
  ];
  
  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Render the appropriate content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
              <StatusCard>
                <StatusIcon bgColor="#28a745">
                  <i className="fas fa-home"></i>
                </StatusIcon>
                <StatusInfo>
                  <StatusTitle>My Listings</StatusTitle>
                  <StatusValue>{myListings.length}</StatusValue>
                </StatusInfo>
              </StatusCard>
              
              <StatusCard>
                <StatusIcon bgColor="#17a2b8">
                  <i className="fas fa-heart"></i>
                </StatusIcon>
                <StatusInfo>
                  <StatusTitle>Saved Properties</StatusTitle>
                  <StatusValue>{savedProperties.length}</StatusValue>
                </StatusInfo>
              </StatusCard>
              
              <StatusCard>
                <StatusIcon bgColor="#6f42c1">
                  <i className="fas fa-envelope"></i>
                </StatusIcon>
                <StatusInfo>
                  <StatusTitle>Messages</StatusTitle>
                  <StatusValue>{messages.filter(m => m.unread).length} / {messages.length}</StatusValue>
                </StatusInfo>
              </StatusCard>
            </div>
            
            <SectionTitle>Recent Messages</SectionTitle>
            <MessageList>
              {messages.slice(0, 2).map(message => (
                <MessageItem key={message.id} unread={message.unread}>
                  <MessageAvatar src={message.avatar} />
                  <MessageContent>
                    <MessageHeader>
                      <MessageSender unread={message.unread}>{message.sender}</MessageSender>
                      <MessageTime>{message.time}</MessageTime>
                    </MessageHeader>
                    <MessagePreview>{message.message}</MessagePreview>
                  </MessageContent>
                </MessageItem>
              ))}
            </MessageList>
            
            <div style={{ textAlign: 'right', marginTop: '10px', marginBottom: '30px' }}>
              <Link to="#" onClick={() => setActiveTab('messages')} style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                View all messages
              </Link>
            </div>
            
            <SectionTitle>My Listings</SectionTitle>
            <PropertyGrid>
              {myListings.map(property => (
                <PropertyCard key={property.id}>
                  <PropertyImage src={property.image}>
                    <PropertyStatus status={property.status}>{property.status}</PropertyStatus>
                  </PropertyImage>
                  <PropertyInfo>
                    <PropertyPrice>{formatPrice(property.price)}</PropertyPrice>
                    <PropertyAddress>{property.address}</PropertyAddress>
                    <PropertyMeta>
                      <span>{property.bedrooms} bed • {property.bathrooms} bath</span>
                      <span>{property.views} views</span>
                    </PropertyMeta>
                    <ActionButtons>
                      <ActionButton primary>Edit</ActionButton>
                      <ActionButton>View</ActionButton>
                    </ActionButtons>
                  </PropertyInfo>
                </PropertyCard>
              ))}
            </PropertyGrid>
          </>
        );
        
      case 'properties':
        return (
          <>
            <SectionTitle>My Listings</SectionTitle>
            {myListings.length > 0 ? (
              <PropertyGrid>
                {myListings.map(property => (
                  <PropertyCard key={property.id}>
                    <PropertyImage src={property.image}>
                      <PropertyStatus status={property.status}>{property.status}</PropertyStatus>
                    </PropertyImage>
                    <PropertyInfo>
                      <PropertyPrice>{formatPrice(property.price)}</PropertyPrice>
                      <PropertyAddress>{property.address}</PropertyAddress>
                      <PropertyMeta>
                        <span>{property.bedrooms} bed • {property.bathrooms} bath</span>
                        <span>{property.views} views</span>
                      </PropertyMeta>
                      <ActionButtons>
                        <ActionButton primary>Edit</ActionButton>
                        <ActionButton>View</ActionButton>
                        <ActionButton>Delete</ActionButton>
                      </ActionButtons>
                    </PropertyInfo>
                  </PropertyCard>
                ))}
              </PropertyGrid>
            ) : (
              <NoItems>You haven't listed any properties yet.</NoItems>
            )}
            
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <SubmitButton type="button">Add New Property</SubmitButton>
            </div>
          </>
        );
        
      case 'saved':
        return (
          <>
            <SectionTitle>Saved Properties</SectionTitle>
            {savedProperties.length > 0 ? (
              <PropertyGrid>
                {savedProperties.map(property => (
                  <PropertyCard key={property.id}>
                    <PropertyImage src={property.image} />
                    <PropertyInfo>
                      <PropertyPrice>{formatPrice(property.price)}</PropertyPrice>
                      <PropertyAddress>{property.address}</PropertyAddress>
                      <PropertyMeta>
                        <span>{property.bedrooms} bed • {property.bathrooms} bath</span>
                      </PropertyMeta>
                      <ActionButtons>
                        <ActionButton primary>View Details</ActionButton>
                        <ActionButton>Remove</ActionButton>
                      </ActionButtons>
                    </PropertyInfo>
                  </PropertyCard>
                ))}
              </PropertyGrid>
            ) : (
              <NoItems>You haven't saved any properties yet.</NoItems>
            )}
          </>
        );
        
      case 'messages':
        return (
          <>
            <SectionTitle>Messages</SectionTitle>
            {messages.length > 0 ? (
              <MessageList>
                {messages.map(message => (
                  <MessageItem key={message.id} unread={message.unread}>
                    <MessageAvatar src={message.avatar} />
                    <MessageContent>
                      <MessageHeader>
                        <MessageSender unread={message.unread}>{message.sender}</MessageSender>
                        <MessageTime>{message.time}</MessageTime>
                      </MessageHeader>
                      <MessagePreview>{message.message}</MessagePreview>
                    </MessageContent>
                  </MessageItem>
                ))}
              </MessageList>
            ) : (
              <NoItems>You have no messages.</NoItems>
            )}
          </>
        );
        
      case 'profile':
        return (
          <>
            <SectionTitle>Profile Settings</SectionTitle>
            <Form>
              <FormGroup>
                <Label>Full Name</Label>
                <Input type="text" defaultValue={user?.name || ''} placeholder="Your full name" />
              </FormGroup>
              
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" defaultValue={user?.email || ''} placeholder="Your email address" />
              </FormGroup>
              
              <FormGroup>
                <Label>Phone Number</Label>
                <Input type="tel" defaultValue={user?.phone || ''} placeholder="Your phone number" />
              </FormGroup>
              
              <FormGroup>
                <Label>Bio</Label>
                <Input as="textarea" rows="4" defaultValue={user?.bio || ''} placeholder="Tell us about yourself" />
              </FormGroup>
              
              <SubmitButton type="button">Save Changes</SubmitButton>
            </Form>
          </>
        );
        
      case 'settings':
        return (
          <>
            <SectionTitle>Account Settings</SectionTitle>
            <Form>
              <FormGroup>
                <Label>Change Password</Label>
                <Input type="password" placeholder="Current password" />
              </FormGroup>
              
              <FormGroup>
                <Input type="password" placeholder="New password" />
              </FormGroup>
              
              <FormGroup>
                <Input type="password" placeholder="Confirm new password" />
              </FormGroup>
              
              <SubmitButton type="button">Update Password</SubmitButton>
            </Form>
            
            <div style={{ marginTop: '40px' }}>
              <SectionTitle>Notification Settings</SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '10px' }} />
                  Email notifications for new messages
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '10px' }} />
                  Email notifications for saved property updates
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="checkbox" defaultChecked style={{ marginRight: '10px' }} />
                  Marketing emails and newsletters
                </label>
              </div>
              
              <SubmitButton type="button" style={{ marginTop: '20px' }}>Save Preferences</SubmitButton>
            </div>
          </>
        );
        
      default:
        return <div>Select a tab from the menu</div>;
    }
  };

  return (
    <Container>
      <DashboardHeader>
        <div>
          <Title>User Dashboard</Title>
          <p>Manage your properties and account</p>
        </div>
        
        <UserInfo>
          <Avatar>{getInitials(user?.name)}</Avatar>
          <div>
            <UserName>{user?.name || 'User'}</UserName>
            <UserEmail>{user?.email || 'user@example.com'}</UserEmail>
          </div>
        </UserInfo>
      </DashboardHeader>
      
      <DashboardContent>
        <Sidebar>
          <MenuList>
            <MenuItem>
              <MenuButton 
                active={activeTab === 'overview'} 
                onClick={() => setActiveTab('overview')}
              >
                <i className="fas fa-home"></i> Overview
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton 
                active={activeTab === 'properties'} 
                onClick={() => setActiveTab('properties')}
              >
                <i className="fas fa-building"></i> My Properties
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton 
                active={activeTab === 'saved'} 
                onClick={() => setActiveTab('saved')}
              >
                <i className="fas fa-heart"></i> Saved Properties
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton 
                active={activeTab === 'messages'} 
                onClick={() => setActiveTab('messages')}
              >
                <i className="fas fa-envelope"></i> Messages
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton 
                active={activeTab === 'profile'} 
                onClick={() => setActiveTab('profile')}
              >
                <i className="fas fa-user"></i> Profile
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton 
                active={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')}
              >
                <i className="fas fa-cog"></i> Settings
              </MenuButton>
            </MenuItem>
          </MenuList>
        </Sidebar>
        
        <MainContent>
          {renderContent()}
        </MainContent>
      </DashboardContent>
    </Container>
  );
};

export default Dashboard; 