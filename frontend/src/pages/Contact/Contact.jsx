import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';
import Container from '../../components/Container'
import Section from '../../components/Section'

function Contact() {
  return (
    <>
      <Section id="center" className="center_o">
        <Container>
          <div className="row center_o1">
            <div className="col-md-12 text-center">
              <h1>Contact <span className="col_4">Us</span></h1>
              <h5 className="normal col_1 mb-0">
                <Link className="col_2" to="/">Home</Link> <span className="col_2"> / </span>
                <Link className="col_2" to="/">Pages</Link> <span className="col_2"> / </span> Contact Us
              </h5>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="contact">
        <Container>
          <div className="contact_t row">
            <div className="col-md-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114964.53925916665!2d-80.29949920266738!3d25.782390733064336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a20ec8c111%3A0xff96f271ddad4f65!2sMiami%2C+FL%2C+USA!5e0!3m2!1sen!2sin!4v1530774403788"
                height="450"
                style={{ border: 0, width: '100%' }}
                allowFullScreen
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>
          <div className="contact_1 row">
            <div className="col-md-4 mb-4">
              <div className="contact_1i text-center p-4">
                <span className="span_1"><i className="fa fa-phone"></i></span>
                <h4>PHONE</h4>
                <h5 className="mb-0">
                  <span className="span_2 d-block">0123 - 456 - 7890</span> 
                </h5>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="contact_1i text-center p-4">
                <span className="span_1"><i className="fa fa-envelope"></i></span>
                <h4>EMAIL</h4>
                <h5 className="mb-0">
                  <a href="mailto:mq77gill@gmail.com" className="text-black d-block">mq77gill@gmail.com</a>
                  <a href="mailto:info@gmail.com" className="d-none d-block mt-2">info@gmail.com</a>
                </h5>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="contact_1i text-center p-4">
                <span className="span_1"><i className="fa fa-location-arrow"></i></span>
                <h4>ADDRESS</h4>
                <h5 className="mb-0">
                  Lahore, Punjab, Pakistan
                </h5>
              </div>
            </div>
          </div>
          <div className="blog_p_1ri4 row">
            <div className="col-md-6 mb-4">
              <h3>Contact <span className="col_4">Form</span></h3>
              <br />
              <div className="mb-3">
                <h6>Your Name</h6>
                <input className="form-control" type="text" />
              </div>
              <div className="mb-3">
                <h6>Your Email</h6>
                <input className="form-control" type="email" />
              </div>
              <div className="mb-3">
                <h6>Subject</h6>
                <input className="form-control" type="text" />
              </div>
              <div className="mb-3">
                <h6>Your Comment</h6>
                <textarea className="form-control form_1"></textarea>
              </div>
              <p>All blog comments are checked prior to publishing</p>
              <h5 className="mb-0">
                <button className="button">Send Now</button>
              </h5>
            </div>
            <div className="col-md-6">
              <img src="https://images.unsplash.com/photo-1747909020005-6dc48e78a4dd?q=80&w=600" className="w-100" alt="Contact Us" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default Contact;