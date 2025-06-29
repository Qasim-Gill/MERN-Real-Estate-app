import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';
import Section from '../Section';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, updatePostLikes } from '../../Redux/postSlice';
import PostService from '../../database/property.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import conf from '../../conf.js';

function FeaturedProperties() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  // console.log(posts); // in your component

  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?._id;
  const [loadingLikes, setLoadingLikes] = useState({});

  function handleDeletePost(postId) {
    if (window.confirm("Are you sure you want to delete this property?")) {
      PostService.deletePost(postId)
        .then(() => {
          dispatch(deletePost(postId));
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  }

  const handleLike = async (postId) => {
    if (!userId) {
      toast.info('Please login to like posts');
      return;
    }

    setLoadingLikes(prev => ({ ...prev, [postId]: true }));
    // Optimistically update UI
    const currentPost = posts.find(p => p._id === postId);
    const wasLiked = Array.isArray(currentPost?.likes) && currentPost.likes.includes(userId);

    try {

      // Make API call
      const response = await axios.post(`${conf.baseUrl}/api/posts/${postId}/like`, {}, {
        withCredentials: true
      });

      // Update with actual server response
      dispatch(updatePostLikes({
        postId,
        likes: response.data.likes,
        dislikes: response.data.dislikes
      }));

      toast.success(wasLiked ? 'Removed your like' : 'Post liked!');
    } catch (error) {
      toast.error('Failed to like post');
      console.error('Like error:', error);
    } finally {
      setLoadingLikes(prev => ({ ...prev, [postId]: false }));
    }
  };

  const handleDislike = async (postId) => {
    if (!userId) {
      toast.info('Please login to dislike posts');
      return;
    }

    setLoadingLikes(prev => ({ ...prev, [postId]: true }));
    // Optimistically update UI
    const currentPost = posts.find(p => p._id === postId);
    const wasDisliked = Array.isArray(currentPost?.dislikes) && currentPost.dislikes.includes(userId);

    try {

      // Make API call
      const response = await axios.post(`${conf.baseUrl}/api/posts/${postId}/dislike`, {}, {
        withCredentials: true
      });

      // Update with actual server response
      dispatch(updatePostLikes({
        postId,
        likes: response.data.likes,
        dislikes: response.data.dislikes
      }));

      toast.success(wasDisliked ? 'Removed your dislike' : 'Post disliked!');
    } catch (error) {
      toast.error('Failed to dislike post');
      console.error('Dislike error:', error);
    } finally {
      setLoadingLikes(prev => ({ ...prev, [postId]: false }));
    }
  };

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

  const featuredProperties = posts
    ?.filter(post => post.isFeatured === true)
    ?.map((item) => ({
      id: item._id,
      image: item.images?.[0]?.url || '',
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
      likes: Array.isArray(item.likes) ? item.likes : [],
      dislikes: Array.isArray(item.dislikes) ? item.dislikes : [],
      likesCount: Array.isArray(item.likes) ? item.likes.length : 0,
      dislikesCount: Array.isArray(item.dislikes) ? item.dislikes.length : 0
    }));

  return (
    <Section id="featured">
      <Container>
        <div className="row locate_1 mb-4 text-center my-5">
          <div className="col-md-12">
            <h2>Featured <span className="col_4">Properties</span></h2>
            <p className="mb-0">
              Explore our premium selection of featured properties with exceptional value and unique features.
            </p>
          </div>
        </div>

        {featuredProperties?.length > 0 ? (
          <div className="row gap-3">
            {featuredProperties.map((property) => {
              const isLiked = Array.isArray(property.likes) && property.likes.includes(userId);
              const isDisliked = Array.isArray(property.dislikes) && property.dislikes.includes(userId);
              const isLoading = loadingLikes[property.id];

              return (
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
                      <h6 className="mgt">
                        <Link className="bg_1" to={`/property/${property.id}`}>Featured</Link>
                      </h6>
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
                        <Link className='text-dark' to={`/property/${property.id}`}>{property.title}</Link>
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

                    <div className="d-flex justify-content-between align-items-center mt-3 border-top pt-3">
                      <div className="d-flex gap-2">
                        <button
                          className={`btn btn-sm ${isLiked ? 'btn-success' : 'btn-outline-secondary'}`}
                          onClick={() => handleLike(property.id)}
                          disabled={isLoading}
                        >
                          <i className="fa fa-thumbs-up"></i> {property.likesCount}
                        </button>
                        <button
                          className={`btn btn-sm ${isDisliked ? 'btn-danger' : 'btn-outline-secondary'}`}
                          onClick={() => handleDislike(property.id)}
                          disabled={isLoading}
                        >
                          <i className="fa fa-thumbs-down"></i> {property.dislikesCount}
                        </button>
                      </div>

                      <div className="feature_2m_last_i">
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
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-5">
            <h4>No featured properties available at the moment</h4>
            <p>Check back later for our premium property selections</p>
          </div>
        )}
      </Container>
    </Section>
  );
}

export default FeaturedProperties;