import React from 'react';
import Container from '../Container';
import Section from '../Section'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <Section id="footer">
        <div className="footer_m">
          <Container>
            <div className="row footer_1">
              <div className="col-md-6">
                <div className="footer_1l">
                  <h2 className="text-white"><span className="col_4">Newsletter</span> – Get Updates & News</h2>
                </div>
              </div>
              <div className="col-md-6">
                <div className="footer_1r">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control form_2"
                      placeholder="Enter Your Email"
                    />
                    <span className="input-group-btn">
                      <button className="btn btn-primary" type="button">
                        Subscribe
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row footer_2">
              <div className="col-md-6">
                <div className="footer_2i">
                  <h4 className="text-white mb-3">About Us</h4>
                  <p className="col_3">
                    Explore trusted property listings in prime locations with expert support every step of the way.
                  </p>
                  <h4 className="text-white">Social Links</h4>
                  <ul className="social-network social-circle mb-0 mt-3">
                    <li><a href="#" className="icoFacebook" title="Facebook"><i className="fa fa-facebook"></i></a>
                    </li>
                    <li><a href="#" className="icoLinkedin" title="Linkedin"><i className="fa fa-linkedin"></i></a>
                    </li>
                    <li><a href="#" className="icoTwitter" title="Twitter"><i className="fa fa-twitter"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="offset-1 col-md-2">
                <div className="footer_2i1">
                  <h4 className="text-white mb-3">Useful Links</h4>
                  <ul>
                    <li className="mb-1"><Link className="col_3" to="/">Property Listings</Link></li>
                    <li className="mb-1"><Link className="col_3" to="/">Agent Directory</Link></li>
                    <li className="mb-1"><Link className="col_3" to="/">Saved Properties</Link></li>
                    <li className="mb-1"><Link className="col_3" to="/">Client Dashboard</Link></li>
                    <li><Link className="col_3" to="/">Support</Link></li>
                  </ul>
                </div>
              </div>
              <div className="offset-1 col-md-2">
                <div className="footer_2i1">
                  <h4 className="text-white mb-3">Quick Links</h4>
                  <ul>
                    <li className="mb-1"><Link className="col_3" to="/">Home</Link></li>
                    <li className="mb-1"><Link className="col_3" to="/">Services</Link></li>
                    <li className="mb-1"><Link className="col_3" to="/about">About</Link></li>
                    <li><Link className="col_3" to="/contact">Contact</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row footer_3 text-center">
              <div className="col-md-12">
                <p style={{ marginTop: '30px' }} className="mb-0 col_3">
                  © 2025 Gill ESTAET. All Rights Reserved | Design by{' Muhammad Qasim '}
                  <a className="col_1" href="http://www.templateonweb.com" target="_blank" rel="noopener noreferrer">
                    TemplateOnWeb
                  </a>
                </p>
              </div>
            </div>
          </Container>
        </div>
      </Section>
    </>
  );
}

export default Footer;