import { Link } from 'react-router-dom';
import Container from '../Container';
import Section from '../Section';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../../Redux/postSlice';
import PostService from '../../database/property.js'
import PostFilters from '../PostFilters/PostFilters.jsx';


function PropertiesSale() {

  const dispatch = useDispatch();
  const { posts, filteredPosts } = useSelector((state) => state.posts);

  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?._id;

  function handleDeletePost(postId) {
    if (window.confirm("Are you sure you want to delete this property?")) {
      PostService.deletePost(postId)
        .then(() => {
          // Dispatch action to remove post from Redux store
          dispatch(deletePost(postId));
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  }

  // Utility function to calculate "posted time ago"
  function timeAgo(timestamp) {
    const now = new Date();
    const postedDate = new Date(timestamp);
    const diffInMs = now - postedDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  }

  // Map local database format to UI expected format
  const activePosts = filteredPosts.length > 0 ? filteredPosts : posts;
  const properties = activePosts?.map((item) => ({
    id: item._id,
    image: item.images?.[0]?.url || '',  // First image only
    featured: item.isFeatured || false,
    price: `$${item.price}`,
    title: item.title,
    details: {
      area: `${item.area} sq ft`,
      beds: `${item.beds} Beds`,
      baths: `${item.baths} Baths`,
      garage: `${item.garage} Garage`,
      balcony: `${item.balcony} Balcony`
    },
    agent: item.author,
    posted: timeAgo(item.createdAt),
    userId: item.author?._id,
  }));

  return (
    <Section id="sale">
      <Container>
        <PostFilters />
        <div className="row locate_1 mb-4 text-center">
          <div className="col-md-12">
            <h2>Properties For <span className="col_4">Sale</span></h2>
            <p className="mb-0">
              Explore our premium selection of properties with exceptional value and unique features.
            </p>
          </div>
        </div>

        {properties?.length > 0 ? (
          <div className="row gap-3">
            {properties.map((property) => (
              <div className="col-md-4 mb-4 p-0 border_1" key={property.id}>
                <div className="home_inner_im" style={{ overflow: 'hidden' }}>
                  <div className="home_inner_im1 ratio ratio-16x9">
                    {property.image && (
                      <Link to={`/property/${property.id}`}>
                        <img
                          src={property.image}
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                          alt={property.title || 'Property image'}
                        />
                      </Link>
                    )}
                  </div>
                  <div className="home_inner_im2">
                    {/* {console.log(userId, property)} */}
                    {userId && userId === property.userId && (
                      <div className="d-flex gap-2 float-end">
                        <Link
                          className="btn btn-sm btn-info"
                          to={`/post-property/${property.id}`}
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeletePost(property.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    )}
                    {property.featured && (
                      <h6 className="mgt">
                        <Link className="bg_1" to={`/property/${property.id}`}>Featured</Link>
                      </h6>
                    )}
                    <h4 className="text-white normal">
                      {property.price && (
                        <Link className="bg_5 pull-left" to={`/property/${property.id}`}>{property.price}</Link>
                      )}
                    </h4>
                  </div>
                </div>
                <div className="feature_2m_last">
                  {property.title && (
                    <h4>
                      <Link className="text-dark" to={`/property/${property.id}`}>{property.title}</Link>
                    </h4>
                  )}

                  <h6>
                    {property.details?.area && (
                      <><i className="fa fa-object-group col_1"></i> {property.details.area}{' '}</>
                    )}
                    {property.details?.beds && (
                      <><i className="fa fa-hotel col_1"></i> {property.details.beds}{' '}</>
                    )}
                  </h6>

                  <h6>
                    {property.details?.baths && (
                      <><i className="fa fa-home col_1"></i> {property.details.baths}{' '}</>
                    )}
                    {property.details?.garage && (
                      <><i className="fa fa-wrench col_1"></i> {property.details.garage}{' '}</>
                    )}
                    {property.details?.balcony && (
                      <><i className="fa fa-building col_1"></i> {property.details.balcony}</>
                    )}
                  </h6>

                  <div className='mt-2 pt-2 border-top'>
                    <h6 className="mb-0">
                      <Link to={`/property/${property.id}`} className="d-flex justify-content-between align-items-center w-100">
                        {property.agent && (
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={property.agent?.image?.url}
                              className="rounded-circle"
                              style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                              alt={property.agent.fullname}
                            />
                            <div className="d-flex flex-column">
                              <span className="fw-semibold text-black-50">{property.agent?.fullname}</span>
                              <small className="text-muted fst-italic">{property.agent?.category}</small>
                            </div>
                          </div>
                        )}
                        {property.posted && (
                          <div className="text-end ms-2">
                            <span className="text-muted">
                              <i className="fa fa-calendar me-1"></i> {property.posted}
                            </span>
                          </div>
                        )}
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <h4>No properties available at the moment</h4>
          </div>
        )}
      </Container>
    </Section>
  );
}

export default PropertiesSale;