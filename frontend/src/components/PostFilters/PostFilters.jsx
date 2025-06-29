// src/components/PostFilters.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchPosts from "../../Redux/thunks/searchPosts";
import { resetFilteredPosts } from "../../Redux/postSlice";

const PostFilters = () => {
    const dispatch = useDispatch();
    const { filteredPosts } = useSelector((state) => state.posts);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (title) params.append("title", title);
        if (category) params.append("category", category);
        if (sortBy) params.append("sortBy", sortBy);
        dispatch(searchPosts(params.toString()));
    };

    const handleReset = () => {
        setTitle("");
        setCategory("");
        setSortBy("");
        dispatch(resetFilteredPosts());
    };

    return (
        <form onSubmit={handleSubmit} className="row mb-4 align-items-end">
            <div className="col-md-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    id="title"
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., House, Apartment"
                />
            </div>

            <div className="col-md-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                    id="category"
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Plot">Plot</option>
                    <option value="Office">Office</option>
                    <option value="Shop">Shop</option>
                    <option value="Farmhouse">Farmhouse</option>
                </select>
            </div>

            <div className="col-md-3">
                <label htmlFor="sortby" className="form-label">Sort By</label>
                <select
                    id="sortby"
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">Default</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="likes">Most Liked</option>
                    {/* <option value="views">Most Viewed</option> */}
                </select>
            </div>

            <div className="col-md-3 d-flex gap-2">
                <button type="submit" className="btn btn-primary w-100">
                    Apply Filters
                </button>
                {filteredPosts.length > 0 && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                )}
            </div>
        </form>
    );
};

export default PostFilters;
