import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;

  span {
    color: var(--tertiary-color);
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    margin-top: 1rem;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const NavItem = styled.li`
  margin-right: 1.5rem;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
    width: 100%;
    text-align: center;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary-color);
  }

  @media (max-width: 768px) {
    display: block;
    padding: 0.8rem;
    border-bottom: 1px solid #f4f4f4;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }
`;

const Button = styled(Link)`
  padding: 0.5rem 1.5rem;
  margin-left: 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 1rem;
    width: 100%;
    text-align: center;
  }
`;

const LoginButton = styled(Button)`
  background-color: transparent;
  color: var(--tertiary-color);
  border: 1px solid var(--tertiary-color);

  &:hover {
    background-color: var(--tertiary-color);
    color: white;
  }
`;

const RegisterButton = styled(Button)`
  background-color: var(--primary-color);
  color: white;
  border: 1px solid var(--primary-color);

  &:hover {
    background-color: #cf1920;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--primary-color);

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const authLinks = (
    <>
      <NavItem>
        <NavLink to="/properties">Properties</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/blog">Blog</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </NavItem>
      {user && user.role === 'admin' && (
        <NavItem>
          <NavLink to="/admin">Admin</NavLink>
        </NavItem>
      )}
      <NavItem>
        <NavLink to="/about">About</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/contact">Contact</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/" onClick={logout}>
          Logout
        </NavLink>
      </NavItem>
    </>
  );

  const guestLinks = (
    <>
      <NavItem>
        <NavLink to="/properties">Properties</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/blog">Blog</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/about">About</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/contact">Contact</NavLink>
      </NavItem>
    </>
  );

  return (
    <HeaderContainer>
      <NavContainer>
        <Logo to="/">
          Listing<span>z</span>
        </Logo>

        <MobileMenuButton onClick={toggleMenu}>
          {isOpen ? '×' : '☰'}
        </MobileMenuButton>

        <Nav isOpen={isOpen}>
          <NavList>
            {isAuthenticated ? authLinks : guestLinks}
          </NavList>

          {!isAuthenticated && (
            <AuthButtons>
              <LoginButton to="/login">Login</LoginButton>
              <RegisterButton to="/register">Register</RegisterButton>
            </AuthButtons>
          )}
        </Nav>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header; 