import React from 'react'
import './Services.css'
import { Link } from 'react-router-dom';
import Container from '../../components/Container'
import Section from '../../components/Section'
import Testimonial from '../../components/Testimonial/Testimonial'
import PropertyServices from '../../components/PropertyServices/PropertyServices'
import NewsContainer from '../../components/NewsContainer/NewsContainer'

function Services() {
  // Services data
  const services = [
    {
      id: 1,
      icon: 'fa fa-modx',
      title: 'Real Estate Appraisal',
      description: 'Get accurate property valuations from certified experts to make informed buying or selling decisions.',
      link: '/'
    },
    {
      id: 2,
      icon: 'fa fa-bed',
      title: 'Premium Quality Homes',
      description: 'Browse our handpicked selection of high-end residential properties designed for luxury living.',
      link: '/'
    },
    {
      id: 3,
      icon: 'fa fa-bar-chart',
      title: 'Favourite Properties',
      description: 'Save and manage your favorite listings to easily compare and revisit properties that catch your eye.',
      link: '/'
    },
    {
      id: 4,
      icon: 'fa fa-anchor',
      title: 'Real Estate Financing',
      description: 'Explore home loan options and get expert assistance with financing your property investment.',
      link: '/'
    },
    {
      id: 5,
      icon: 'fa fa-building',
      title: 'Buy Property',
      description: 'Find residential, commercial, and investment properties with verified listings and agent support.',
      link: '/'
    },
    {
      id: 6,
      icon: 'fa fa-home',
      title: 'Rent Property',
      description: 'Discover rental homes, apartments, and office spaces in prime locations at competitive rates.',
      link: '/'
    }
  ];

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

  // Split services into two rows of 3 items each
  const firstRowServices = services.slice(0, 3);
  const secondRowServices = services.slice(3, 6);

  return (
    <>
      {/* Header Section */}
      <Section id="center" className="center_o">
        <Container>
          <div className="row center_o1">
            <div className="col-md-12 text-center">
              <h1>Our <span className="col_4">Services</span></h1>
              <h5 className="normal col_1 mb-0">
                <Link className="col_2" to="/">Home</Link>
                <span className="col_2"> / </span>
                <Link className="col_2" to="/pages">Pages</Link>
                <span className="col_2"> / </span>
                Services
              </h5>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Grid Section */}
      <Section id="serv_pg">
        <Container>
          {/* First Row */}
          <div className="row serv_pg1 mb-4">
            {firstRowServices.map(service => (
              <div key={service.id} className="col-md-4 mb-4 mb-md-0">
                <div className="serv_pg1i p-4 h-100">
                  <span className="col_1 mb-3 d-block">
                    <i className={service.icon} style={{ fontSize: '2rem' }}></i>
                  </span>
                  <h4 className="mb-3">
                    <Link to={service.link} className="text-decoration-none">
                      {service.title}
                    </Link>
                  </h4>
                  <p className="mb-0">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="row serv_pg1">
            {secondRowServices.map(service => (
              <div key={service.id} className="col-md-4 mb-4 mb-md-0">
                <div className="serv_pg1i p-4 h-100">
                  <span className="col_1 mb-3 d-block">
                    <i className={service.icon} style={{ fontSize: '2rem' }}></i>
                  </span>
                  <h4 className="mb-3">
                    <Link to={service.link} className="text-decoration-none">
                      {service.title}
                    </Link>
                  </h4>
                  <p className="mb-0">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* News Section */}
      <Section id="news_h">
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
      </Section>

      {/* Property Services Section */}
      <PropertyServices />

      {/* Testimonial Section */}
      <Testimonial />
    </>
  );
}

export default Services