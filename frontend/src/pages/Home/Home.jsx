import React from 'react'
// import { useEffect } from 'react'
import Container from '../../components/Container'
import Section from '../../components/Section'
import PopularLocations from '../../components/PopularLocations/PopularLocations'
import PropertyServices from '../../components/PropertyServices/PropertyServices'
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties'
import OurAgents from '../../components/OurAgents/OurAgents'
import Testimonial from '../../components/Testimonial/Testimonial'

import { useSelector } from 'react-redux';
// import { setPosts, setLoading, setError } from '../../Redux/postSlice';
// import postService from '../../database/property';

import { Link } from 'react-router-dom'

import './Home.css'

function Home() {

  // const dispatch = useDispatch();
  // const posts = useSelector(state => state.posts.posts);
  // const loading = useSelector(state => state.posts.loading);
  // const error = useSelector(state => state.posts.error);
  const { loading, error } = useSelector(state => state.posts);

  if (loading) {
    return <div style={{ textAlign: 'center' }} className='my-5'>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }} className='my-5'>Error: {error}</div>;
  }


  return (
    <>
      <Section id="center" className="center_h">
        <Container>
        </Container>
      </Section>
      <PopularLocations />
      <Section id="offer">
        <div className="offer_m">
          <Container>
            <div className="row locate_1 mb-4 text-center">
              <div className="col-md-12">
                <h2 className="text-white">What We <span className="col_4">Offer</span></h2>
                <p className="mb-0 col_3">
                  Discover prime real estate opportunities in top cities worldwide. <br />
                  From modern apartments to luxury homes, find a property that fits your lifestyle and budget.
                  Start your journey with trusted listings today.
                </p>
              </div>
            </div>
            <div className="row offer_1">
              <div className="col-md-5">
                <div className="offer_1l">
                  <h2 className="text-white">We’re <span className="col_4">Offering</span> Unmatched Services</h2>
                  <p className="col_3">
                    Explore top-tier real estate solutions tailored to your needs. From buying and selling to investment advice, we deliver results that matter.
                    Whether you're looking for a home or a profitable property, our expertise guides every step of your journey.
                  </p>
                  <p className="col_3">
                    We connect you with verified listings, expert agents, and local market insights.
                    Get seamless support, smart tools, and the confidence to make informed real estate decisions today.
                  </p>
                  <div className="offer_1li row">
                    <div className="col-md-4 col-sm-4">
                      <div className="offer_1li1">
                        <h3 className="col_1">9839</h3>
                        <h5 className="text-white">Clients</h5>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div className="offer_1li1">
                        <h3 className="col_1">14</h3>
                        <h5 className="text-white">Awards</h5>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div className="offer_1li1">
                        <h3 className="col_1">978</h3>
                        <h5 className="text-white">Projects</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="offer_1r row mb-4">
                  <div className="col-md-6">
                    <div className="offer_1ri">
                      <span className="col_1"><i className="fa fa-desktop"></i></span>
                      <h4><a className="text-white" href="#">Fastest Service</a></h4>
                      <p className="col_3 mb-0">Get property listings and approvals quickly with our seamless online system.</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="offer_1ri">
                      <span className="col_1"><i className="fa fa-database"></i></span>
                      <h4><a className="text-white" href="#">Largest Real Estate</a></h4>
                      <p className="col_3 mb-0">Access thousands of verified listings across residential, commercial, and rental properties.</p>
                    </div>
                  </div>
                </div>
                <div className="offer_1r row">
                  <div className="col-md-6">
                    <div className="offer_1ri">
                      <span className="col_1"><i className="fa fa-lock"></i></span>
                      <h4><a className="text-white" href="#">Property Insurance</a></h4>
                      <p className="col_3 mb-0">Protect your investment with our affordable and comprehensive insurance plans.</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="offer_1ri">
                      <span className="col_1"><i className="fa fa-codepen"></i></span>
                      <h4><a className="text-white" href="#">Doorstep Process</a></h4>
                      <p className="col_3 mb-0">We handle everything from visits to paperwork—right at your doorstep.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Container>
        </div>
      </Section>
      <PropertyServices />
      <FeaturedProperties />
      <OurAgents />
      <Section id="spec">
        <div className="offer_m">
          <Container>
            <div className="row locate_1 mb-4 text-center">
              <div className="col-md-12">
                <h2 className="text-white">What Makes Us The Preferred Choice</h2>
                <p className="mb-0 col_3">
                  Find your perfect home in locations designed for comfort and convenience. <br />
                  From stylish interiors to smart investments, we help you choose with confidence and ease.
                </p>
              </div>
            </div>
            <div className="row spec_1">
              <div className="col-md-7">
                <div className="spec_1r row mb-4">
                  <div className="col-md-6 mb-4 mb-md-0">
                    <div className="spec_1ri p-4 h-100">
                      <span className="col_1 fs-3 d-block mb-3"><i className="fa fa-desktop"></i></span>
                      <h4 className="text-white mb-3"><Link to="#" className="text-white">Maximum Choices</Link></h4>
                      <p className="col_3 mb-0">
                        Browse from a wide variety of verified properties across all major cities and neighborhoods.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="spec_1ri p-4 h-100">
                      <span className="col_1 fs-3 d-block mb-3"><i className="fa fa-database"></i></span>
                      <h4 className="text-white mb-3"><Link to="#" className="text-white">Buyers Trust Us</Link></h4>
                      <p className="col_3 mb-0">
                        Thousands of happy buyers rely on our transparent listings and expert advice to find their ideal homes.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="spec_1r row">
                  <div className="col-md-6 mb-4 mb-md-0">
                    <div className="spec_1ri p-4 h-100">
                      <span className="col_1 fs-3 d-block mb-3"><i className="fa fa-lock"></i></span>
                      <h4 className="text-white mb-3"><Link to="#" className="text-white">Seller Prefer Us</Link></h4>
                      <p className="col_3 mb-0">
                        We offer top visibility and fast deals, making us the go-to platform for serious property sellers.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="spec_1ri p-4 h-100">
                      <span className="col_1 fs-3 d-block mb-3"><i className="fa fa-codepen"></i></span>
                      <h4 className="text-white mb-3"><Link to="#" className="text-white">Expert Guidance</Link></h4>
                      <p className="col_3 mb-0">
                        Our agents guide you at every step—from property tours to legal documentation and closing deals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="spec_1l p-4 p-lg-5 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '10px' }}>
                  <h3 className="col_1 mb-4">What Makes Us</h3>
                  <p className="text-white-50 mb-4">
                    We simplify your property journey with expert support, verified listings, and market insights.
                    Whether you're buying, selling, or investing, our tailored solutions ensure you make informed decisions with confidence.
                  </p>
                  <p className="mb-0 text-white-50">
                    Trusted by thousands across the country, we provide a seamless experience from property search to final paperwork.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Section>
      <Testimonial />
      <Section id="connect">
        <Container>
          <div className="row locate_1 mb-4 text-center">
            <div className="col-md-12">
              <h2>We Are <span className="col_4">Here</span> For You</h2>
              <p className="mb-0">
                Find the perfect property with ease, whether you're searching for a new home or a smart investment. <br />
                From curated listings to expert support, we make every step smooth and stress-free.
              </p>
            </div>
          </div>
          <div className="row connect_1">
            <div className="col-md-3">
              <div className="connect_1i text-center">
                <span style={{ fontSize: '40px' }} className="col_1 d-inline-block">
                  <i className="fa fa-map-marker"></i>
                </span>
                <h1>200+</h1>
                <h5>Property Locations</h5>
              </div>
            </div>
            <div className="col-md-3">
              <div className="connect_1i text-center">
                <span style={{ fontSize: '40px' }} className="col_1 d-inline-block">
                  <i className="fa fa-users"></i>
                </span>
                <h1>100+</h1>
                <h5>Professional Agents</h5>
              </div>
            </div>
            <div className="col-md-3">
              <div className="connect_1i text-center">
                <span style={{ fontSize: '40px' }} className="col_1 d-inline-block">
                  <i className="fa fa-building"></i>
                </span>
                <h1>200+</h1>
                <h5>Property for Sell</h5>
              </div>
            </div>
            <div className="col-md-3">
              <div className="connect_1i text-center">
                <span style={{ fontSize: '40px' }} className="col_1 d-inline-block">
                  <i className="fa fa-home"></i>
                </span>
                <h1>3000+</h1>
                <h5>Property for Rent</h5>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Home