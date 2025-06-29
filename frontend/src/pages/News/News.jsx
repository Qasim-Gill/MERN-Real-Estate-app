import React from 'react'
import './News.css'
import NewsContainer from '../../components/NewsContainer/NewsContainer'
import Container from '../../components/Container'
import Section from '../../components/Section'

function News() {

  // News Data
  const newsData = [
    {
      id: 1,
      imageUrl: '/img/20.jpg',
      title: 'Housing Market Hits Record Highs',
      date: 'Jan 21, 2020',
      author: 'Admin',
      description: 'Property values are climbing in urban areas, making it a seller’s market.',
      likes: 336,
      comments: 39,
      shares: 142,
      link: '/',
    },
    {
      id: 2,
      imageUrl: '/img/another-image.jpg',
      title: 'Exciting Market Trends',
      date: 'Feb 15, 2021',
      author: 'Editor',
      description: 'Discover how demand for suburban homes and green spaces is reshaping buyer behavior.',
      likes: 210,
      comments: 15,
      shares: 85,
      link: '/',
    },
    {
      id: 3,
      imageUrl: '/img/21.jpg',
      title: 'Tips for First-Time Homebuyers',
      date: 'Mar 10, 2021',
      author: 'RealtyPro',
      description: 'Learn how to navigate the buying process, from budgeting to closing.',
      likes: 185,
      comments: 22,
      shares: 67,
      link: '/',
    },
    {
      id: 4,
      imageUrl: '/img/22.jpg',
      title: 'Commercial Spaces in Demand',
      date: 'Apr 5, 2021',
      author: 'MarketWatch',
      description: 'Small businesses are driving demand for flexible office and retail spaces.',
      likes: 145,
      comments: 18,
      shares: 53,
      link: '/',
    }
  ];

  return (
    < Section id="news_h" >
      <Container>
        <div className="row locate_1 mb-4 text-center">
          <div className="col-md-12">
            <h2>Latest <span className="col_4">News</span></h2>
            <p className="mb-0">
              Explore properties with confidence through expert support and verified listings. <br />
              Whether buying or renting, we simplify the process from search to closing.
            </p>
          </div>
        </div>
        <div className="news_h_1 row  mt-0 clearfix">
          {newsData.map((newsItem) => (
            <NewsContainer key={newsItem.id} news={newsItem} />
          ))}
        </div>
      </Container>
    </Section >
  )
}

export default News