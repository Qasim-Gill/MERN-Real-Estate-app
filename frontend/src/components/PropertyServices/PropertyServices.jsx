import Container from '../Container';
import Section from '../Section';
import { Link } from 'react-router-dom';

function PropertyServices() {
  // Dynamic data for services
  const services = [
    {
      id: 1,
      title: 'Houses',
      description: 'Discover a wide range of family homes in prime locations, suited for every lifestyle and budget.',
      icon: 'fa-home',
      link: '/'
    },
    {
      id: 2,
      title: 'Apartments',
      description: 'Browse modern apartments with top amenities, perfect for urban living or long-term rentals.',
      icon: 'fa-building-o',
      link: '/'
    },
    {
      id: 3,
      title: 'Commercial',
      description: 'Find commercial spaces ideal for offices, retail, or startups, backed by expert leasing support.',
      icon: 'fa-gear',
      link: '/'
    }
  ];

  return (
    <Section id="serv_home">
      <Container>
        <div className="row locate_1 mb-4 text-center">
          <div className="col-md-12">
            <h2>Property <span className="col_4">Services</span></h2>
            <p className="mb-0">
              Explore a wide range of property services designed to simplify your real estate journey.
              From buying and selling to management and support, we help you move with confidence.
            </p>
          </div>
        </div>
        <div className="serv_home_1 row my-5">
          {services.map((service) => (
            <div className="col-md-4 mb-4" key={service.id}>
              <div className="serv_home_1i">
                <div className="serv_home_1i1">
                  <h4 className="text-white">{service.title}</h4>
                  <p className="col_3">{service.description}</p>
                  <h5 className="mb-0">
                    <Link className="col_1" to={service.link}>
                      Read More <i className="fa fa-long-arrow-right"></i>
                    </Link>
                  </h5>
                </div>
                <div className="serv_home_1i2">
                  <span><i className={`fa ${service.icon}`}></i></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default PropertyServices;