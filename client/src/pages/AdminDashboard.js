import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
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

const AdminInfo = styled.div`
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

const AdminName = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;

const AdminRole = styled.div`
  font-size: 0.9rem;
  color: #666;
  background-color: var(--tertiary-color);
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
  margin-top: 5px;
  display: inline-block;
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  background-color: ${props => props.bgColor || 'white'};
  color: ${props => props.bgColor ? 'white' : '#333'};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: ${props => props.bgColor ? 0.9 : 0.7};
`;

const StatChange = styled.div`
  font-size: 0.8rem;
  color: ${props => props.positive ? '#28a745' : props.negative ? '#dc3545' : '#666'};
  margin-top: 5px;
  display: flex;
  align-items: center;
`;

const ChartContainer = styled.div`
  height: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--secondary-color);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.button`
  padding: 8px 15px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #cf1920;
  }
  
  i {
    margin-right: 5px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid #eee;
  color: #666;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
`;

const Badge = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  background-color: ${props => {
    if (props.status === 'active') return '#d4edda';
    if (props.status === 'inactive') return '#f8d7da';
    if (props.status === 'pending') return '#fff3cd';
    if (props.status === 'admin') return '#cce5ff';
    return '#e2e3e5';
  }};
  color: ${props => {
    if (props.status === 'active') return '#155724';
    if (props.status === 'inactive') return '#721c24';
    if (props.status === 'pending') return '#856404';
    if (props.status === 'admin') return '#004085';
    return '#383d41';
  }};
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  background: ${props => 
    props.danger ? '#f8d7da' : 
    props.warning ? '#fff3cd' : 
    props.success ? '#d4edda' : '#e2e3e5'};
  color: ${props => 
    props.danger ? '#721c24' : 
    props.warning ? '#856404' : 
    props.success ? '#155724' : '#383d41'};
  
  &:hover {
    opacity: 0.8;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 300px;
`;

const FilterSelect = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 4px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  
  // Mock data
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [articles, setArticles] = useState([]);
  
  // Fetch mock data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Mock users
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joinDate: '2023-01-15', lastLogin: '2023-11-10' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', status: 'active', joinDate: '2023-02-20', lastLogin: '2023-11-12' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'user', status: 'inactive', joinDate: '2023-03-05', lastLogin: '2023-10-25' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'user', status: 'active', joinDate: '2023-04-10', lastLogin: '2023-11-05' },
        { id: 5, name: 'Michael Chen', email: 'michael@example.com', role: 'user', status: 'pending', joinDate: '2023-05-18', lastLogin: 'N/A' }
      ];
      
      // Mock properties
      const mockProperties = [
        { id: 1, title: 'Modern Apartment in Downtown', price: 350000, status: 'active', owner: 'Sarah Williams', listed: '2023-09-10', views: 184 },
        { id: 2, title: 'Luxury Villa with Pool', price: 1250000, status: 'active', owner: 'John Doe', listed: '2023-10-05', views: 92 },
        { id: 3, title: 'Cozy Studio near University', price: 180000, status: 'pending', owner: 'Robert Johnson', listed: '2023-11-01', views: 56 },
        { id: 4, title: 'Spacious Family Home', price: 550000, status: 'active', owner: 'John Doe', listed: '2023-08-15', views: 210 },
        { id: 5, title: 'Waterfront Penthouse', price: 975000, status: 'inactive', owner: 'Sarah Williams', listed: '2023-07-20', views: 145 }
      ];
      
      // Mock articles
      const mockArticles = [
        { id: 1, title: 'Housing Market Trends: What to Expect in 2023', status: 'published', author: 'Jane Smith', date: '2023-11-15', views: 423 },
        { id: 2, title: '5 Home Renovations That Actually Pay Off', status: 'published', author: 'Robert Johnson', date: '2023-11-10', views: 318 },
        { id: 3, title: 'First-Time Homebuyer? Here\'s Your Complete Guide', status: 'pending', author: 'Sarah Williams', date: '2023-11-05', views: 0 },
        { id: 4, title: 'The Impact of Rising Interest Rates on Real Estate', status: 'published', author: 'Michael Chen', date: '2023-10-28', views: 256 },
        { id: 5, title: 'Commercial Real Estate: Post-Pandemic Recovery', status: 'draft', author: 'Jane Smith', date: '2023-10-22', views: 0 }
      ];
      
      setUsers(mockUsers);
      setProperties(mockProperties);
      setArticles(mockArticles);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };
  
  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  // Filter and search users
  const filteredUsers = users.filter(user => {
    // Apply search
    if (searchTerm && !user.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !user.email.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply filter
    if (filter !== 'all' && user.status !== filter) {
      return false;
    }
    
    return true;
  });
  
  // Filter and search properties
  const filteredProperties = properties.filter(property => {
    // Apply search
    if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !property.owner.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply filter
    if (filter !== 'all' && property.status !== filter) {
      return false;
    }
    
    return true;
  });
  
  // Filter and search articles
  const filteredArticles = articles.filter(article => {
    // Apply search
    if (searchTerm && !article.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !article.author.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply filter
    if (filter !== 'all' && article.status !== filter) {
      return false;
    }
    
    return true;
  });
  
  // Render the appropriate content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            <StatsGrid>
              <StatCard bgColor="var(--primary-color)">
                <StatLabel>Total Users</StatLabel>
                <StatValue>{users.length}</StatValue>
                <StatChange positive>+12% this month</StatChange>
              </StatCard>
              
              <StatCard bgColor="var(--secondary-color)">
                <StatLabel>Total Properties</StatLabel>
                <StatValue>{properties.length}</StatValue>
                <StatChange positive>+8% this month</StatChange>
              </StatCard>
              
              <StatCard bgColor="var(--tertiary-color)">
                <StatLabel>Total Articles</StatLabel>
                <StatValue>{articles.length}</StatValue>
                <StatChange positive>+15% this month</StatChange>
              </StatCard>
              
              <StatCard>
                <StatLabel>Total Views</StatLabel>
                <StatValue>{formatNumber(properties.reduce((sum, p) => sum + p.views, 0) + articles.reduce((sum, a) => sum + a.views, 0))}</StatValue>
                <StatChange positive>+23% this month</StatChange>
              </StatCard>
            </StatsGrid>
            
            <ChartContainer>
              <SectionTitle>Monthly Statistics</SectionTitle>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', color: '#999' }}>
                Chart visualization would go here (using libraries like Chart.js or Recharts)
              </div>
            </ChartContainer>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <SectionTitle>Recent Properties</SectionTitle>
                <Table>
                  <thead>
                    <tr>
                      <Th>Title</Th>
                      <Th>Price</Th>
                      <Th>Status</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.slice(0, 3).map(property => (
                      <tr key={property.id}>
                        <Td>{property.title}</Td>
                        <Td>{formatPrice(property.price)}</Td>
                        <Td>
                          <Badge status={property.status}>
                            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                          </Badge>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              
              <div>
                <SectionTitle>Recent Articles</SectionTitle>
                <Table>
                  <thead>
                    <tr>
                      <Th>Title</Th>
                      <Th>Author</Th>
                      <Th>Status</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.slice(0, 3).map(article => (
                      <tr key={article.id}>
                        <Td>{article.title}</Td>
                        <Td>{article.author}</Td>
                        <Td>
                          <Badge status={article.status === 'published' ? 'active' : article.status === 'draft' ? 'inactive' : 'pending'}>
                            {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                          </Badge>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </>
        );
        
      case 'users':
        return (
          <>
            <SectionTitle>
              User Management
              <AddButton>
                <i className="fas fa-plus"></i> Add User
              </AddButton>
            </SectionTitle>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <SearchInput 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <div>
                <FilterSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </FilterSelect>
              </div>
            </div>
            
            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Status</Th>
                  <Th>Join Date</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <Badge status={user.role === 'admin' ? 'admin' : ''}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge status={user.status}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </Td>
                    <Td>{user.joinDate}</Td>
                    <Td>
                      <ActionButtonGroup>
                        <ActionButton>Edit</ActionButton>
                        {user.status === 'active' ? (
                          <ActionButton warning>Deactivate</ActionButton>
                        ) : (
                          <ActionButton success>Activate</ActionButton>
                        )}
                        <ActionButton danger>Delete</ActionButton>
                      </ActionButtonGroup>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
            <Pagination>
              <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                Previous
              </PageButton>
              <PageButton active>{currentPage}</PageButton>
              <PageButton onClick={() => setCurrentPage(prev => prev + 1)}>
                Next
              </PageButton>
            </Pagination>
          </>
        );
        
      case 'properties':
        return (
          <>
            <SectionTitle>
              Property Management
              <AddButton>
                <i className="fas fa-plus"></i> Add Property
              </AddButton>
            </SectionTitle>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <SearchInput 
                type="text" 
                placeholder="Search properties..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <div>
                <FilterSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </FilterSelect>
              </div>
            </div>
            
            <Table>
              <thead>
                <tr>
                  <Th>Title</Th>
                  <Th>Price</Th>
                  <Th>Status</Th>
                  <Th>Owner</Th>
                  <Th>Listed Date</Th>
                  <Th>Views</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map(property => (
                  <tr key={property.id}>
                    <Td>{property.title}</Td>
                    <Td>{formatPrice(property.price)}</Td>
                    <Td>
                      <Badge status={property.status}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </Badge>
                    </Td>
                    <Td>{property.owner}</Td>
                    <Td>{property.listed}</Td>
                    <Td>{formatNumber(property.views)}</Td>
                    <Td>
                      <ActionButtonGroup>
                        <ActionButton>Edit</ActionButton>
                        <ActionButton>View</ActionButton>
                        <ActionButton danger>Delete</ActionButton>
                      </ActionButtonGroup>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
            <Pagination>
              <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                Previous
              </PageButton>
              <PageButton active>{currentPage}</PageButton>
              <PageButton onClick={() => setCurrentPage(prev => prev + 1)}>
                Next
              </PageButton>
            </Pagination>
          </>
        );
        
      case 'articles':
        return (
          <>
            <SectionTitle>
              News & Insights Management
              <AddButton>
                <i className="fas fa-plus"></i> Add Article
              </AddButton>
            </SectionTitle>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <SearchInput 
                type="text" 
                placeholder="Search articles..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <div>
                <FilterSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="pending">Pending</option>
                  <option value="draft">Draft</option>
                </FilterSelect>
              </div>
            </div>
            
            <Table>
              <thead>
                <tr>
                  <Th>Title</Th>
                  <Th>Status</Th>
                  <Th>Author</Th>
                  <Th>Date</Th>
                  <Th>Views</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map(article => (
                  <tr key={article.id}>
                    <Td>{article.title}</Td>
                    <Td>
                      <Badge status={article.status === 'published' ? 'active' : article.status === 'draft' ? 'inactive' : 'pending'}>
                        {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                      </Badge>
                    </Td>
                    <Td>{article.author}</Td>
                    <Td>{article.date}</Td>
                    <Td>{formatNumber(article.views)}</Td>
                    <Td>
                      <ActionButtonGroup>
                        <ActionButton>Edit</ActionButton>
                        <ActionButton>View</ActionButton>
                        {article.status !== 'published' && (
                          <ActionButton success>Publish</ActionButton>
                        )}
                        <ActionButton danger>Delete</ActionButton>
                      </ActionButtonGroup>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
            <Pagination>
              <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                Previous
              </PageButton>
              <PageButton active>{currentPage}</PageButton>
              <PageButton onClick={() => setCurrentPage(prev => prev + 1)}>
                Next
              </PageButton>
            </Pagination>
          </>
        );
        
      case 'settings':
        return (
          <>
            <SectionTitle>Site Settings</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                <h3 style={{ marginBottom: '15px' }}>General Settings</h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', fontWeight: '500' }}>Site Name</label>
                    <input 
                      type="text" 
                      defaultValue="Listingz" 
                      style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', fontWeight: '500' }}>Contact Email</label>
                    <input 
                      type="email" 
                      defaultValue="contact@listingz.com" 
                      style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', fontWeight: '500' }}>Phone Number</label>
                    <input 
                      type="tel" 
                      defaultValue="+1 (555) 123-4567" 
                      style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} 
                    />
                  </div>
                  
                  <button 
                    type="button" 
                    style={{ 
                      padding: '10px', 
                      backgroundColor: 'var(--primary-color)', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      marginTop: '10px', 
                      cursor: 'pointer', 
                      fontWeight: 'bold' 
                    }}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
              
              <div>
                <h3 style={{ marginBottom: '15px' }}>System Settings</h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" id="maintenance" style={{ marginRight: '10px' }} />
                    <label htmlFor="maintenance">Maintenance Mode</label>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" id="registration" defaultChecked style={{ marginRight: '10px' }} />
                    <label htmlFor="registration">User Registration Enabled</label>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" id="userListings" defaultChecked style={{ marginRight: '10px' }} />
                    <label htmlFor="userListings">Allow User Property Listings</label>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', fontWeight: '500' }}>Maximum Image Upload Size (MB)</label>
                    <input 
                      type="number" 
                      defaultValue="5" 
                      style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} 
                    />
                  </div>
                  
                  <button 
                    type="button" 
                    style={{ 
                      padding: '10px', 
                      backgroundColor: 'var(--primary-color)', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      marginTop: '10px', 
                      cursor: 'pointer', 
                      fontWeight: 'bold' 
                    }}
                  >
                    Save Settings
                  </button>
                </form>
              </div>
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
          <Title>Admin Dashboard</Title>
          <p>Manage your site, users, properties, and content</p>
        </div>
        
        <AdminInfo>
          <Avatar>{getInitials(user?.name)}</Avatar>
          <div>
            <AdminName>{user?.name || 'Admin User'}</AdminName>
            <AdminRole>Administrator</AdminRole>
          </div>
        </AdminInfo>
      </DashboardHeader>
      
      <DashboardContent>
        <Sidebar>
          <MenuList>
            <MenuItem>
              <MenuButton 
                active={activeTab === 'dashboard'} 
                onClick={() => setActiveTab('dashboard')}
              >
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton 
                active={activeTab === 'users'} 
                onClick={() => setActiveTab('users')}
              >
                <i className="fas fa-users"></i> Users
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton 
                active={activeTab === 'properties'} 
                onClick={() => setActiveTab('properties')}
              >
                <i className="fas fa-building"></i> Properties
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton 
                active={activeTab === 'articles'} 
                onClick={() => setActiveTab('articles')}
              >
                <i className="fas fa-newspaper"></i> News & Insights
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
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              Loading...
            </div>
          ) : (
            renderContent()
          )}
        </MainContent>
      </DashboardContent>
    </Container>
  );
};

export default AdminDashboard; 