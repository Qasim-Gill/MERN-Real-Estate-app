import { useState, useEffect } from 'react';
import Input from '../../components/Input';
import './PostProperty.css';
import { useForm } from "react-hook-form";
import Container from '../../components/Container';
import Section from '../../components/Section';
import { useNavigate, useParams } from 'react-router-dom';

// import store from "../../Redux/store.js"; // Import store
import { useSelector, useDispatch } from 'react-redux';
import { addPost, updatePost as updatePostInStore, setLoading, setPosts } from '../../Redux/postSlice';
import PostService from '../../database/property.js';

function PostProperty() {
  const { id: postId } = useParams(); // Get postId from URL if available
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { id: userId } = useSelector((state) => state.auth.userData);
  const { posts } = useSelector((state) => state.posts);

  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");

  // Initialize the form
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

  // Pre-fill form if editing
  useEffect(() => {
    if (postId) {
      // const existingPost = posts.find(post => post.id === postId);
      const existingPost = posts.find(post => String(post._id) === String(postId));
      // console.log("postId from URL:", postId);
      // console.log("Available posts in Redux:", posts);

      if (existingPost) {
        for (const key in existingPost) {
          if (key in existingPost) {
            // Handle radio separately
            if (key === "isFeatured") {
              // Convert boolean to string "yes" or "no"
              const value = existingPost[key] ? "yes" : "no";
              setValue("isFeatured", value);
            } else {
              setValue(key, existingPost[key]);
            }
          }
        }

        if (existingPost.images && existingPost.images.length > 0) {
          setImages(existingPost.images);
        }
      }
    }
  }, [postId, posts, setValue]);

  // Handle image upload with validation
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      setImageError("Please select at least one image");
      return;
    }

    const validTypes = ['image/jpeg', 'image/png'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      setImageError("Only JPG or PNG files are allowed");
      return;
    }

    if (files.length > 3) {
      setImageError("You can upload a maximum of 3 images");
      return;
    }

    setImages(files); // ✅ This sets the array of files in state
    setImageError(""); // clear any previous errors
  };

  // I found a bug when i create any post it navigates to properties page and there it doesn't displays image, name, category
  // of author and i need to use get new date of posts from posts on mount on properties page
  // so i think this is the best practice to update data in redux when create or update a post
  const fetchPosts = async () => {
    dispatch(setLoading(true));
    try {
      const data = await PostService.getAllPosts();
      dispatch(setPosts(data));
    } catch (error) {
      console.error("something went wrong on getting fresh posts on PostProperty.jsx Components")
      console.error(error)
    }
  };

  // Remove an image from preview
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  let createdPost;

  const onSubmit = async (data) => {
    // Validate images before submission (skip if editing existing post)
    if (images.length < 1 && !postId) {
      setImageError("Please upload at least 1 image");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    dispatch(setLoading(true));

    try {
      const formData = new FormData();

      // Append all form data
      for (const key in data) {
        formData.append(key, data[key]);
      }

      // Append images
      images.forEach((image, index) => {
        formData.append("images", image);
      });


      if (postId) {
        // Update Post
        const updatedPost = await PostService.updatePost(postId, formData);
        dispatch(updatePostInStore(updatedPost));
        // console.log("Post updated successfully", updatedPost);
      } else {
        // Create New Post
        createdPost = await PostService.createPost(formData);
        console.log(createdPost)
        dispatch(addPost(createdPost));
        // console.log("Post created successfully", createdPost);
      }
      // Fetch fresh posts after creating or updating
      await fetchPosts();
      reset();  // <-- This clears the form
      navigate(`/properties`);

    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to post property";
      setSubmitError(errorMessage);
      console.error(errorMessage);
    } finally {

      setIsSubmitting(false);
      dispatch(setLoading(false));
      // reset();  // <-- This clears the form
      // navigate(`/properties`);
      // navigate(`/post-property/${postId || createdPost.id}`); // Redirect to the post detail page
    }
  };

  return (
    <Section className="post-property-section">
      <Container className="post-property-container">
        <h3 className="post-property-title">Post New Property</h3>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="post-property-form">

          {/* isFeatured */}
          <div className="post-property-form-group">
            <label className="post-property-label">Is Featured:</label>
            <div className="post-property-radio-group">
              <input type="radio" value="yes" {...register('isFeatured', { required: false })} className="post-property-radio" />
              <span className="post-property-radio-label">Yes</span>
              <input type="radio" value="no" {...register('isFeatured', { required: false })} className="post-property-radio" />
              <span className="post-property-radio-label">No</span>
            </div>
          </div>

          {/* Other fields */}
          {/* one lesson i learned is if required is bool type eg required: true then it will not show any error message */}
          {/* but if you give string it will give error message if user doesn't enter input */}
          <Input label="Title" {...register('title', { required: "Title is required" })} error={errors.title} />
          <Input label="Description" {...register('description', { required: "Description is required" })} error={errors.description} />
          <Input label="Price" type="number" {...register('price', { required: "Price is required" })} error={errors.price} />
          <Input label="Balconies" type="number" {...register('balcony', { required: "Balcony is required" })} error={errors.balcony} />
          <Input label="Garage" type="number" {...register('garage', { required: "Garage is required" })} error={errors.garage} />
          <Input label="Bathrooms" type="number" {...register('baths', { required: "Baths is required" })} error={errors.baths} />
          <Input label="Beds" type="number" {...register('beds', { required: "Enter no Beds" })} error={errors.beds} />
          <Input label="Area (sq ft)" type="number" {...register('area', { required: "Enter Area" })} error={errors.area} />

          {/* Category Select - Now properly required */}
          <div className="post-property-form-group">
            <label htmlFor="category" className="post-property-label">Category</label>
            <select
              id='category'
              name="category"
              className='post-property-select'
              {...register('category', { required: "Category is required" })}
            >
              <option value="">Select a category</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Plot">Plot</option>
              <option value="Office">Office</option>
              <option value="Shop">Shop</option>
              <option value="Farmhouse">Farmhouse</option>
            </select>
            {errors.category && <p className="post-property-error-message">{errors.category.message}</p>}
          </div>

          {/* Image Upload Section - New addition */}
          <div className="post-property-form-group">
            <label className="post-property-label">Upload Images (1-3 images required)</label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="post-property-file-input"
            />
            {imageError && <p className="post-property-error-message">{imageError}</p>}

            {/* Image preview container */}
            <div className="post-property-image-preview-container">
              {images.map((image, index) => {
                const imageUrl = typeof image === "string"
                  ? image  // Just in case it's directly a URL
                  : image.url
                    ? image.url  // existing post image
                    : URL.createObjectURL(image);  // new uploaded image

                return (
                  <div key={index} className="post-property-image-preview">
                    <img
                      src={imageUrl}
                      alt={`Preview ${index}`}
                      className="post-property-image-thumbnail"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="post-property-remove-image-btn"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {submitError && (
            <div className="alert alert-danger" role="alert">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            className="post-property-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Property'}
          </button>
        </form>
      </Container>
    </Section>
  );
}

export default PostProperty;