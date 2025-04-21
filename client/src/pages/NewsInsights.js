import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  color: var(--tertiary-color);
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-align: center;
`;

const Subtitle = styled.h2`
  color: var(--secondary-color);
  margin-bottom: 40px;
  font-size: 1.2rem;
  text-align: center;
  font-weight: normal;
`;

const CategoryBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
`;

const CategoryButton = styled.button`
  background: ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  border: ${props => props.active ? 'none' : '1px solid #ddd'};
  padding: 10px 20px;
  margin: 0 10px 10px 0;
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : '#f5f5f5'};
  }
`;

const FeaturedSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainArticle = styled.div`
  grid-column: 1;
  grid-row: 1 / span 2;
  
  @media (max-width: 768px) {
    grid-row: 1;
  }
`;

const SecondaryArticle = styled.div`
  grid-column: 2;
  
  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

const ArticlesGrid = styled.div`
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

const ArticleCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ArticleImage = styled.div`
  height: 200px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;

const LargeArticleImage = styled(ArticleImage)`
  height: 350px;
`;

const ArticleInfo = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ArticleCategory = styled.div`
  color: var(--primary-color);
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ArticleTitle = styled.h3`
  margin-bottom: 15px;
  color: var(--secondary-color);
  font-size: ${props => props.large ? '1.8rem' : '1.3rem'};
  line-height: 1.4;
`;

const ArticleExcerpt = styled.p`
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
  flex-grow: 1;
`;

const ArticleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #999;
`;

const ReadMoreLink = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoadMoreButton = styled.button`
  background-color: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  padding: 12px 30px;
  margin: 40px auto;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  display: block;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

const NewsInsights = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Simulate fetching data
  useEffect(() => {
    // Mock data
    setTimeout(() => {
      const mockArticles = [
        {
          id: 1,
          title: 'Housing Market Trends: What to Expect in 2023',
          excerpt: 'Experts predict significant changes in the housing market. Here\'s what buyers and sellers should know about the upcoming trends.',
          category: 'Market Trends',
          author: 'Jane Cooper',
          date: 'Nov 15, 2023',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2330&q=80'
        },
        {
          id: 2,
          title: '5 Home Renovations That Actually Pay Off',
          excerpt: 'Not all home improvements deliver the same return on investment. These five renovations are proven to increase your property value.',
          category: 'Home Improvement',
          author: 'Robert Johnson',
          date: 'Nov 10, 2023',
          image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        },
        {
          id: 3,
          title: 'First-Time Homebuyer? Here\'s Your Complete Guide',
          excerpt: 'Navigating the home buying process can be overwhelming. This comprehensive guide will walk you through each step.',
          category: 'Buying',
          author: 'Sarah Williams',
          date: 'Nov 5, 2023',
          image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        },
        {
          id: 4,
          title: 'The Impact of Rising Interest Rates on Real Estate',
          excerpt: 'With interest rates continuing to climb, what does this mean for homebuyers and sellers? Our experts break down the effects.',
          category: 'Finance',
          author: 'Michael Chen',
          date: 'Oct 28, 2023',
          image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        },
        {
          id: 5,
          title: 'Commercial Real Estate: Post-Pandemic Recovery',
          excerpt: 'The commercial property sector is adapting to new realities. Learn how the industry is bouncing back and what changes are here to stay.',
          category: 'Commercial',
          author: 'Amanda Brooks',
          date: 'Oct 22, 2023',
          image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        },
        {
          id: 6,
          title: 'Sustainable Homes: The Future of Real Estate',
          excerpt: 'Eco-friendly properties are gaining popularity. Discover how sustainability is reshaping the housing market and what features buyers want.',
          category: 'Sustainability',
          author: 'David Palmer',
          date: 'Oct 15, 2023',
          image: 'https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        },
        {
          id: 7,
          title: 'Real Estate Technology Trends for Agents',
          excerpt: 'From virtual tours to AI-powered CRM systems, technology is transforming how agents work. Stay ahead with these essential tech tools.',
          category: 'Technology',
          author: 'Lisa Thompson',
          date: 'Oct 8, 2023',
          image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        }
      ];
      
      setArticles(mockArticles);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Get all unique categories from articles
  const categories = ['all', ...new Set(articles.map(article => article.category))];
  
  // Filter articles based on selected category
  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);
  
  // Featured articles (first 3)
  const featuredArticles = filteredArticles.slice(0, 3);
  // Regular articles (rest)
  const regularArticles = filteredArticles.slice(3);

  return (
    <Container>
      <Title>News & Insights</Title>
      <Subtitle>Stay informed with the latest real estate trends, market insights, and expert advice</Subtitle>
      
      <CategoryBar>
        {categories.map(category => (
          <CategoryButton 
            key={category} 
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category === 'all' ? 'All' : category}
          </CategoryButton>
        ))}
      </CategoryBar>
      
      {featuredArticles.length > 0 && (
        <FeaturedSection>
          <MainArticle>
            <ArticleCard>
              <LargeArticleImage src={featuredArticles[0].image} />
              <ArticleInfo>
                <ArticleCategory>{featuredArticles[0].category}</ArticleCategory>
                <ArticleTitle large>{featuredArticles[0].title}</ArticleTitle>
                <ArticleExcerpt>{featuredArticles[0].excerpt}</ArticleExcerpt>
                <ArticleMeta>
                  <span>{featuredArticles[0].date} • By {featuredArticles[0].author}</span>
                  <ReadMoreLink to={`/news/${featuredArticles[0].id}`}>Read More</ReadMoreLink>
                </ArticleMeta>
              </ArticleInfo>
            </ArticleCard>
          </MainArticle>
          
          {featuredArticles.length > 1 && (
            <SecondaryArticle>
              <ArticleCard>
                <ArticleImage src={featuredArticles[1].image} />
                <ArticleInfo>
                  <ArticleCategory>{featuredArticles[1].category}</ArticleCategory>
                  <ArticleTitle>{featuredArticles[1].title}</ArticleTitle>
                  <ArticleExcerpt>{featuredArticles[1].excerpt}</ArticleExcerpt>
                  <ArticleMeta>
                    <span>{featuredArticles[1].date}</span>
                    <ReadMoreLink to={`/news/${featuredArticles[1].id}`}>Read More</ReadMoreLink>
                  </ArticleMeta>
                </ArticleInfo>
              </ArticleCard>
            </SecondaryArticle>
          )}
          
          {featuredArticles.length > 2 && (
            <SecondaryArticle>
              <ArticleCard>
                <ArticleImage src={featuredArticles[2].image} />
                <ArticleInfo>
                  <ArticleCategory>{featuredArticles[2].category}</ArticleCategory>
                  <ArticleTitle>{featuredArticles[2].title}</ArticleTitle>
                  <ArticleExcerpt>{featuredArticles[2].excerpt}</ArticleExcerpt>
                  <ArticleMeta>
                    <span>{featuredArticles[2].date}</span>
                    <ReadMoreLink to={`/news/${featuredArticles[2].id}`}>Read More</ReadMoreLink>
                  </ArticleMeta>
                </ArticleInfo>
              </ArticleCard>
            </SecondaryArticle>
          )}
        </FeaturedSection>
      )}
      
      {regularArticles.length > 0 && (
        <>
          <ArticlesGrid>
            {regularArticles.map(article => (
              <ArticleCard key={article.id}>
                <ArticleImage src={article.image} />
                <ArticleInfo>
                  <ArticleCategory>{article.category}</ArticleCategory>
                  <ArticleTitle>{article.title}</ArticleTitle>
                  <ArticleExcerpt>{article.excerpt}</ArticleExcerpt>
                  <ArticleMeta>
                    <span>{article.date}</span>
                    <ReadMoreLink to={`/news/${article.id}`}>Read More</ReadMoreLink>
                  </ArticleMeta>
                </ArticleInfo>
              </ArticleCard>
            ))}
          </ArticlesGrid>
          
          <LoadMoreButton>Load More Articles</LoadMoreButton>
        </>
      )}
    </Container>
  );
};

export default NewsInsights; 