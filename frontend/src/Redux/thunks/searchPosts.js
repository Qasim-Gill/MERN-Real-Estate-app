import axios from "axios";
import conf from "../../conf";
import { setFilteredPosts, setLoading, setError } from "../postSlice";

const searchPosts = (queryParams) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${conf.baseUrl}/api/posts/search?${queryParams}`);
    dispatch(setFilteredPosts(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to search posts"));
  } finally {
    dispatch(setLoading(false));
  }
};

export default searchPosts;
