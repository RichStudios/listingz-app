import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BreadcrumbNav = styled.nav`
  margin-bottom: 30px;
`;

const Breadcrumb = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Category = styled.div`
  color: var(--primary-color);
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 15px;
  text-transform: uppercase;
`;

const Title = styled.h1`
  color: var(--tertiary-color);
  margin-bottom: 20px;
  font-size: 2.5rem;
  line-height: 1.3;
`;

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  color: #666;
  font-size: 0.9rem;
`;

const AuthorImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  margin-right: 15px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const FeaturedImage = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-bottom: 30px;
`;

const ArticleContent = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;
  color: #333;
  
  p, ul, ol {
    margin-bottom: 25px;
  }
  
  h2 {
    font-size: 1.8rem;
    color: var(--secondary-color);
    margin: 40px 0 20px;
  }
  
  h3 {
    font-size: 1.4rem;
    color: var(--secondary-color);
    margin: 30px 0 15px;
  }
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  blockquote {
    border-left: 4px solid var(--primary-color);
    padding-left: 20px;
    font-style: italic;
    margin: 30px 0;
  }
`;

const RelatedArticlesSection = styled.div`
  margin-top: 60px;
  border-top: 1px solid #eee;
  padding-top: 40px;
`;

const SectionTitle = styled.h3`
  color: var(--secondary-color);
  margin-bottom: 30px;
  font-size: 1.5rem;
`;

const RelatedArticles = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ArticleCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ArticleImage = styled.div`
  height: 180px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;

const ArticleInfo = styled.div`
  padding: 20px;
`;

const ArticleTitle = styled.h4`
  margin-bottom: 10px;
  color: var(--secondary-color);
  font-size: 1.1rem;
  line-height: 1.4;
`;

const ReadMoreLink = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Simulate fetching data
  useEffect(() => {
    // In a real app, you would fetch the specific article using the ID
    // axios.get(`/api/articles/${id}`)
    
    // Mock data
    setTimeout(() => {
      const mockArticle = {
        id: parseInt(id),
        title: 'Housing Market Trends: What to Expect in 2023',
        category: 'Market Trends',
        author: 'Jane Cooper',
        authorImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        date: 'November 15, 2023',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2330&q=80',
        content: `
          <p>The housing market has seen unprecedented changes over the past few years. From skyrocketing prices during the pandemic to concerns about a market correction, homebuyers and sellers alike are wondering what to expect in 2023.</p>
          
          <h2>Supply and Demand Dynamics</h2>
          <p>One of the defining characteristics of the housing market over the last few years has been the imbalance between supply and demand. Housing inventory reached record lows, leading to bidding wars and rapidly escalating prices.</p>
          <p>In 2023, experts predict a gradual increase in inventory as more homeowners become comfortable selling and new construction projects are completed. This should help to alleviate some of the pressure on home prices, though demand is expected to remain strong in many markets.</p>
          
          <h2>Interest Rate Trends</h2>
          <p>After historically low interest rates during the pandemic, the Federal Reserve has implemented several rate hikes to combat inflation. Mortgage rates have risen in response, affecting affordability for many potential homebuyers.</p>
          <p>Looking ahead to 2023, most economists expect interest rates to stabilize, though they are likely to remain higher than the pandemic-era lows. This new normal will require both buyers and sellers to adjust their expectations.</p>
          
          <h2>Regional Market Variations</h2>
          <p>It's important to note that real estate remains fundamentally local. While national trends provide a helpful overview, markets can vary significantly by region, city, and even neighborhood.</p>
          <p>Areas with strong job growth, particularly in the technology and healthcare sectors, are expected to maintain robust housing markets despite broader economic concerns. Meanwhile, some previously overheated markets may see more significant corrections.</p>
          
          <h2>Advice for Buyers in 2023</h2>
          <p>If you're looking to buy a home in 2023, consider these strategies:</p>
          <ul>
            <li>Get pre-approved for a mortgage to understand your budget and show sellers you're serious</li>
            <li>Be patient and prepared for a potentially longer search than in previous years</li>
            <li>Consider homes that might need some updates but have good bones and location</li>
            <li>Work with a knowledgeable local real estate agent who understands your specific market</li>
          </ul>
          
          <h2>Advice for Sellers in 2023</h2>
          <p>Sellers should adjust their expectations from the frenzied market of recent years:</p>
          <ul>
            <li>Price your home realistically based on recent comparable sales</li>
            <li>Invest in necessary repairs and consider strategic upgrades</li>
            <li>Be prepared for homes to stay on the market longer than during the pandemic boom</li>
            <li>Consider offering incentives to buyers, such as closing cost assistance</li>
          </ul>
          
          <h2>The Bottom Line</h2>
          <p>While the 2023 housing market may not be as seller-friendly as recent years, it's expected to move toward a healthier balance. This transition period may present challenges, but it also offers opportunities for both buyers and sellers who approach the market with realistic expectations and sound strategies.</p>
        `
      };
      
      const mockRelated = [
        {
          id: 2,
          title: '5 Home Renovations That Actually Pay Off',
          category: 'Home Improvement',
          date: 'Nov 10, 2023',
          image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        },
        {
          id: 4,
          title: 'The Impact of Rising Interest Rates on Real Estate',
          category: 'Finance',
          date: 'Oct 28, 2023',
          image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        },
        {
          id: 7,
          title: 'Real Estate Technology Trends for Agents',
          category: 'Technology',
          date: 'Oct 8, 2023',
          image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
        }
      ];
      
      setArticle(mockArticle);
      setRelatedArticles(mockRelated);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  if (loading) {
    return (
      <Container>
        <p>Loading article...</p>
      </Container>
    );
  }
  
  if (!article) {
    return (
      <Container>
        <Title>Article Not Found</Title>
        <p>The article you're looking for doesn't exist or has been removed.</p>
        <Breadcrumb to="/news">Back to News & Insights</Breadcrumb>
      </Container>
    );
  }

  return (
    <Container>
      <BreadcrumbNav>
        <Breadcrumb to="/news">News & Insights</Breadcrumb> / {article.category}
      </BreadcrumbNav>
      
      <Category>{article.category}</Category>
      <Title>{article.title}</Title>
      
      <ArticleMeta>
        <AuthorImage src={article.authorImage} />
        <AuthorInfo>
          <span>By {article.author}</span>
        </AuthorInfo>
        <Divider>•</Divider>
        <span>{article.date}</span>
        <Divider>•</Divider>
        <span>{article.readTime}</span>
      </ArticleMeta>
      
      <FeaturedImage src={article.image} />
      
      <ArticleContent dangerouslySetInnerHTML={{ __html: article.content }} />
      
      {relatedArticles.length > 0 && (
        <RelatedArticlesSection>
          <SectionTitle>Related Articles</SectionTitle>
          <RelatedArticles>
            {relatedArticles.map(related => (
              <ArticleCard key={related.id}>
                <ArticleImage src={related.image} />
                <ArticleInfo>
                  <Category>{related.category}</Category>
                  <ArticleTitle>{related.title}</ArticleTitle>
                  <ArticleMeta>{related.date}</ArticleMeta>
                  <ReadMoreLink to={`/news/${related.id}`}>Read Article</ReadMoreLink>
                </ArticleInfo>
              </ArticleCard>
            ))}
          </RelatedArticles>
        </RelatedArticlesSection>
      )}
    </Container>
  );
};

export default ArticleDetail; 