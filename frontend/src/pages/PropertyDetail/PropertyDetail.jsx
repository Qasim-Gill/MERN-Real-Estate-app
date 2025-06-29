// import { useNavigate, useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import PostService from '../../database/property.js';
// import './PropertyDetail.css';
// // Bootstrap Carousel component if not already:
// import Carousel from 'react-bootstrap/Carousel';

// function PropertyDetail() {
//   const navigate = useNavigate();
//   const { id: postId } = useParams();

//   const userData = useSelector((state) => state.auth.userData);
//   const canComment = userData?.plan?.features?.canComment || false;
//   const userId = userData?._id;

//   // Get post from Redux store
//   const { posts } = useSelector(state => state.posts);
//   const postFromStore = posts.find(post => String(post._id) === String(postId));

//   // Local state in case post isn't in Redux (e.g., user landed directly)
//   const [post, setPost] = useState(postFromStore || null);
//   const [loading, setLoading] = useState(!postFromStore);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     if (!postFromStore) {
//       const fetchPost = async () => {
//         try {
//           const data = await PostService.getPost(postId);
//           setPost(data);
//         } catch (error) {
//           console.error('Failed to fetch post:', error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchPost();
//     }
//   }, [postFromStore, postId]);

//   const handleGoBack = () => navigate(-1);
//   // console.log("Post Detail", post);

//   if (loading) return <div className="text-center py-5">Loading...</div>;
//   if (!post) return <div className="text-center text-danger py-5">Post not found.</div>;

//   return (
//     <div className="container py-4">
//       <button className="btn btn-outline-success mb-4" onClick={handleGoBack}>
//         ← Go Back
//       </button>

//       {/* Author Info Section */}
//       <div className="card mb-4 shadow-sm">
//         <div className="card-body d-flex align-items-center">
//           {post.author?.image?.url && (
//             <img
//               src={post.author.image.url}
//               className="rounded-circle me-3"
//               alt={post.author.fullname}
//               width="60"
//               height="60"
//             />
//           )}
//           <div>
//             <h5 className="mb-1">{post.author?.fullname || 'Unknown Author'}</h5>
//             {post.category && (
//               <span className="badge bg-secondary">{post.author?.category}</span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Property Details Card */}
//       <div className="card mb-4 shadow">
//         {/* Image Slider */}
//         {post.images?.length > 0 ? (
//           <Carousel activeIndex={activeIndex} onSelect={setActiveIndex} interval={null}>
//             {post.images.map((image, index) => (
//               <Carousel.Item key={index}>
//                 <img
//                   className="d-block w-100"
//                   src={image.url}
//                   alt={`${post.title} - ${index + 1}`}
//                   style={{
//                     height: '500px',
//                     objectFit: 'cover',
//                     objectPosition: 'center'
//                   }}
//                 />
//               </Carousel.Item>
//             ))}
//           </Carousel>
//         ) : (
//           <img
//             src={post.imageLink || 'https://via.placeholder.com/800x500'}
//             className="card-img-top"
//             alt={post.title}
//             style={{
//               height: '500px',
//               objectFit: 'cover',
//               objectPosition: 'center'
//             }}
//           />
//         )}

//         <div className="card-body">
//           <div className="d-flex justify-content-between align-items-start">
//             <h2 className="card-title mb-3">{post.title}</h2>
//             <span className="badge bg-info text-dark">{post.category}</span>
//           </div>

//           <p className="card-text mb-4">{post.description}</p>

//           {/* Property Features */}
//           <div className="row mt-4 g-3">
//             <div className="col-md-3 col-6">
//               <div className="p-3 border rounded text-center bg-light">
//                 <strong>Price</strong>
//                 <div className="text-success fw-bold">${post.price}</div>
//               </div>
//             </div>
//             <div className="col-md-3 col-6">
//               <div className="p-3 border rounded text-center bg-light">
//                 <strong>Area</strong>
//                 <div>{post.area} sq ft</div>
//               </div>
//             </div>
//             <div className="col-md-3 col-6">
//               <div className="p-3 border rounded text-center bg-light">
//                 <strong>Beds</strong>
//                 <div>{post.beds}</div>
//               </div>
//             </div>
//             <div className="col-md-3 col-6">
//               <div className="p-3 border rounded text-center bg-light">
//                 <strong>Baths</strong>
//                 <div>{post.baths}</div>
//               </div>
//             </div>
//             <div className="col-md-3 col-6">
//               <div className="p-3 border rounded text-center bg-light">
//                 <strong>Balcony</strong>
//                 <div>{post.balcony}</div>
//               </div>
//             </div>
//             <div className="col-md-3 col-6">
//               <div className="p-3 border rounded text-center bg-light">
//                 <strong>Garage</strong>
//                 <div>{post.garage}</div>
//               </div>
//             </div>
//             <div className="col-md-3 col-6">
//               <div className="p-3 border rounded text-center bg-light">
//                 <strong>Views</strong>
//                 <div>{post.viewsCount}</div>
//               </div>
//             </div>
//             <div className="col-md-3 col-6">
//               <div className="p-3 border rounded text-center bg-light">
//                 <strong>Featured</strong>
//                 <div>{post.isFeatured ? 'Yes' : 'No'}</div>
//               </div>
//             </div>
//           </div>

//           {/* Post Date */}
//           <div className="mt-4 pt-3 border-top">
//             <p className="text-end text-muted" style={{ fontSize: '0.9rem' }}>
//               Posted on {new Date(post.createdAt).toLocaleDateString()}
//               <br />
//               Last updated: {new Date(post.updatedAt).toLocaleDateString()}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PropertyDetail;





























import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PostService from '../../database/property.js';
import axios from 'axios';
import conf from '../../conf';
import './PropertyDetail.css';
import Carousel from 'react-bootstrap/Carousel';

function PropertyDetail() {
  const navigate = useNavigate();
  const { id: postId } = useParams();

  const userData = useSelector((state) => state.auth.userData);
  console.log("User Data in PropertyDetail", userData);
  const canComment = userData?.plan?.features?.canComment || false;
  const userId = userData?._id;

  // Get post from Redux store
  const { posts } = useSelector(state => state.posts);
  const postFromStore = posts.find(post => String(post._id) === String(postId));

  // Local state
  const [post, setPost] = useState(postFromStore || null);
  const [loading, setLoading] = useState(!postFromStore);
  const [activeIndex, setActiveIndex] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    if (!postFromStore) {
      const fetchPost = async () => {
        try {
          const data = await PostService.getPost(postId);
          setPost(data);
          await fetchComments(data._id);
        } catch (error) {
          console.error('Failed to fetch post:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    } else {
      fetchComments(postFromStore._id);
    }
  }, [postFromStore, postId]);

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`${conf.baseUrl}/api/comments/${postId}`);
      // console.log('Fetched comments:', response.data);
      setComments(response.data.comments);
    } catch (error) {
      setComments([]); // Set to empty array on error
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleGoBack = () => navigate(-1);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError('');
    if (!commentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${conf.baseUrl}/api/comments`, {
        text: commentText,
        postId: post._id
      }, {
        withCredentials: true
      });

      // Refetch comments to get the updated list with author details
      await fetchComments(post._id);
      setCommentText('');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to post comment';
      setCommentError(errorMessage);
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (!post) return <div className="text-center text-danger py-5">Post not found.</div>;

  return (
    <div className="container py-4">
      <button className="btn btn-outline-success mb-4" onClick={handleGoBack}>
        ← Go Back
      </button>

      {/* Author Info Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body d-flex align-items-center">
          {post.author?.image?.url && (
            <img 
              src={post.author.image.url} 
              className="rounded-circle me-3" 
              alt={post.author.fullname}
              width="60"
              height="60"
            />
          )}
          <div>
            <h5 className="mb-1">{post.author?.fullname || 'Unknown Author'}</h5>
            {post.category && (
              <span className="badge bg-secondary">{post.author?.category}</span>
            )}
          </div>
        </div>
      </div>

      {/* Property Details Card */}
      <div className="card mb-4 shadow">
        {/* Image Slider */}
        {post.images?.length > 0 ? (
          <Carousel activeIndex={activeIndex} onSelect={setActiveIndex} interval={null}>
            {post.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image.url}
                  alt={`${post.title} - ${index + 1}`}
                  style={{ 
                    height: '500px', 
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <img 
            src={post.imageLink || 'https://via.placeholder.com/800x500'} 
            className="card-img-top" 
            alt={post.title} 
            style={{ 
              height: '500px', 
              objectFit: 'cover',
              objectPosition: 'center'
            }} 
          />
        )}

        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h2 className="card-title mb-3">{post.title}</h2>
            <span className="badge bg-info text-dark">{post.category}</span>
          </div>
          
          <p className="card-text mb-4">{post.description}</p>

          {/* Property Features */}
          <div className="row mt-4 g-3">
            <div className="col-md-3 col-6">
              <div className="p-3 border rounded text-center bg-light">
                <strong>Price</strong>
                <div className="text-success fw-bold">${post.price}</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="p-3 border rounded text-center bg-light">
                <strong>Area</strong>
                <div>{post.area} sq ft</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="p-3 border rounded text-center bg-light">
                <strong>Beds</strong>
                <div>{post.beds}</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="p-3 border rounded text-center bg-light">
                <strong>Baths</strong>
                <div>{post.baths}</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="p-3 border rounded text-center bg-light">
                <strong>Balcony</strong>
                <div>{post.balcony}</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="p-3 border rounded text-center bg-light">
                <strong>Garage</strong>
                <div>{post.garage}</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="p-3 border rounded text-center bg-light">
                <strong>Views</strong>
                <div>{post.viewsCount}</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="p-3 border rounded text-center bg-light">
                <strong>Featured</strong>
                <div>{post.isFeatured ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>

          {/* Post Date */}
          <div className="mt-4 pt-3 border-top">
            <p className="text-end text-muted" style={{ fontSize: '0.9rem' }}>
              Posted on {new Date(post.createdAt).toLocaleDateString()}
              <br />
              Last updated: {new Date(post.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="card mb-4 shadow">
        <div className="card-body">
          <h5 className="card-title mb-4">Comments ({comments.length})</h5>
          
          {/* Comment Form */}
          {canComment && (
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <div className="form-group">
                <textarea
                  className={`form-control ${commentError ? 'is-invalid' : ''}`}
                  rows="3"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your comment..."
                  required
                />
                {commentError && (
                  <div className="invalid-feedback">{commentError}</div>
                )}
              </div>
              <button 
                type="submit" 
                className="btn btn-primary mt-2"
                disabled={isSubmitting || !commentText.trim()}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Posting...
                  </>
                ) : 'Post Comment'}
              </button>
            </form>
          )}

          {/* Comments List */}
          <div className="comments-list">
            {Array.isArray(comments) && comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="comment mb-3 pb-3 border-bottom">
                  <div className="d-flex align-items-center mb-2">
                    {comment.author?.image?.url && (
                      <img 
                        src={comment.author.image.url} 
                        className="rounded-circle me-2" 
                        alt={comment.author.fullname}
                        width="40"
                        height="40"
                      />
                    )}
                    <div>
                      <strong>{comment.author?.fullname || 'Anonymous'}</strong>
                      {comment.author?.category && (
                        <span className="badge bg-secondary ms-2">{comment.author.category}</span>
                      )}
                    </div>
                    <span className="text-muted ms-auto" style={{ fontSize: '0.8rem' }}>
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mb-0">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-muted">No comments yet. {canComment && 'Be the first to comment!'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;