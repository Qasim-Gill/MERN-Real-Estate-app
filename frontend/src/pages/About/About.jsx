import './About.css'
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container'
import Section from '../../components/Section'
import Testimonial from '../../components/Testimonial/Testimonial'

function AboutPage() {
  // Pricing plans data
  const pricingPlans = [
    {
      id: 1,
      title: "BASIC PLAN",
      tagline: "Start With Basic Package",
      price: 99,
      currency: "$",
      features: [
        "15+ Listings",
        "Contact With Agent",
        "2 Month Validity",
        "7x24 Fully Support",
        "25GB Space",
        "Remote Support"
      ],
      buttonText: "Get a free trial",
      recommended: true,
      popular: false
    },
    {
      id: 2,
      title: "STANDARD PLAN",
      tagline: "Start With Platinum Package",
      price: 149,
      currency: "$",
      features: [
        "15+ Listings",
        "Contact With Agent",
        "2 Month Validity",
        "7x24 Fully Support",
        "25GB Space",
        "Remote Support"
      ],
      buttonText: "Choose Plan",
      recommended: false,
      popular: true
    },
    {
      id: 3,
      title: "EXTENDED PLAN",
      tagline: "Start With Standard Package",
      price: 129,
      currency: "$",
      features: [
        "15+ Listings",
        "Contact With Agent",
        "2 Month Validity",
        "7x24 Fully Support",
        "25GB Space",
        "Remote Support"
      ],
      buttonText: "Get a free trial",
      recommended: true,
      popular: false
    }
  ];

  return (
    <>
      {/* Header Section */}
      <Section id="center" className="center_o">
        <Container>
          <div className="row center_o1">
            <div className="col-md-12 text-center">
              <h1>About <span className="col_4">Us</span></h1>
              <h5 className="normal col_1 mb-0">
                <Link className="col_2" to="/">Home</Link>
                <span className="col_2"> / </span>
                <Link className="col_2" to="/pages">Pages</Link>
                <span className="col_2"> / </span>
                About Us
              </h5>
            </div>
          </div>
        </Container>
      </Section>

      {/* Overview Section */}
      <Section id="overview">
        <Container>
          <div className="row overview_1">
            <div className="col-md-6">
              <div className="overview_1l">
                <h2>Company <span className="col_4">Overview</span></h2>
                <p className="mt-3">
                  We are a full-service real estate company dedicated to helping you buy, sell, or invest in properties with confidence.
                  With years of experience and deep market insight, we provide a seamless experience from discovery to closing.
                  Whether you're looking for a family home, a commercial space, or a rental opportunity, we’re here to guide you.
                </p>
                <h5 className="mb-2">
                  <i style={{ marginRight: '10px', verticalAlign: 'middle' }} className="fa fa-long-arrow-right col_1"></i>
                  Customer-First Approach
                </h5>
                <h5 className="mb-2">
                  <i style={{ marginRight: '10px', verticalAlign: 'middle' }} className="fa fa-long-arrow-right col_1"></i>
                  Results That Last
                </h5>
                <h5 className="mb-4">
                  <i style={{ marginRight: '10px', verticalAlign: 'middle' }} className="fa fa-long-arrow-right col_1"></i>
                  Passionate Real Estate Experts
                </h5>
                <h5 className="mb-0">
                  <Link to="/" className="button">About Our Team</Link>
                </h5>
              </div>
            </div>
            <div className="col-md-6">
              <div className="overview_1r">
                <div className="grid">
                  <figure className="effect-jazz mb-0">
                    <Link to="#">
                      <img src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=880" className="w-100" alt="About us" />
                    </Link>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section id="mission">
        <Container>
          <div className="row locate_1 mb-4 text-center">
            <div className="col-md-12">
              <h2>Our <span className="col_4">Mission</span> & Vision</h2>
              <p className="mb-0">
                We aim to redefine real estate by making the process simple, transparent, and client-focused. <br />
                Our vision is to be the most trusted platform for property buyers, sellers, and investors globally.
              </p>
            </div>
          </div>
          <div className="mission_1 row">
            <div className="col-md-6">
              <div className="mission_1l">
                <div className="grid">
                  <figure className="effect-jazz mb-0">
                    <Link to="#">
                      <img src="https://images.unsplash.com/photo-1564919428547-b4bce90eaaef?q=80&w=880" className="w-100" alt="About us 2" />
                    </Link>
                  </figure>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mission_1r">
                <div className="mission_1ri row m-0">
                  <div className="col-md-1 p-0">
                    <span><i className="fa fa-lock col_1"></i></span>
                  </div>
                  <div className="col-md-11">
                    <h4>Secure Transactions & Expert Guidance</h4>
                    <p className="mb-0">
                      We ensure every transaction is transparent and secure, backed by industry professionals you can trust.
                    </p>
                  </div>
                </div>
                <div className="mission_1ri row m-0 mt-4">
                  <div className="col-md-1 p-0">
                    <span><i className="fa fa-map col_1"></i></span>
                  </div>
                  <div className="col-md-11">
                    <h4>Smart Tools & Location Insights</h4>
                    <p className="mb-0">
                      Leverage powerful tools and detailed neighborhood data to make confident property decisions.
                    </p>
                  </div>
                </div>
                <div className="mission_1ri row m-0 mt-4">
                  <div className="col-md-1 p-0">
                    <span><i className="fa fa-headphones col_1"></i></span>
                  </div>
                  <div className="col-md-11">
                    <h4>24/7 Support & Personalized Service</h4>
                    <p className="mb-0">
                      Our support team is always available to assist you, whether you’re buying your first home or investing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pricing Section */}
      <Section id="pricing">
        <Container>
          <div className="row locate_1 mb-4 text-center">
            <div className="col-md-12">
              <h2>Our <span className="col_4">Pricing</span> Plan</h2>
              <p className="mb-0">
                Discover trusted real estate solutions across prime locations with expert guidance. <br />
                From personalized service to secure transactions, we make your property journey simple.
              </p>
            </div>
          </div>
          <div className="price_1 row">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className="col-md-4 mb-4">
                <div className="price_1i text-center position-relative">
                  {/* Recommended/Popular tag */}
                  {plan.recommended && (
                    <h6 className="col_1 position-absolute top-0 end-0 m-2">Recommended</h6>
                  )}
                  {plan.popular && (
                    <h6 className="col_1 position-absolute top-0 end-0 m-2">Popular</h6>
                  )}

                  <h4>{plan.title}</h4>
                  <p>{plan.tagline}</p>
                  <h1 className={plan.popular ? "col_2" : "col_1"}>
                    <span className="col_2">{plan.currency}</span>{plan.price}
                  </h1>
                  <ul className="list-unstyled">
                    {plan.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <h5 className="mb-0">
                    <Link to="/signup" className={`button_1 ${plan.popular ? "popular-plan" : ""}`}>
                      {plan.buttonText}
                    </Link>
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonial Section */}
      <Testimonial />
    </>
  );
}

export default AboutPage;