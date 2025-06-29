import axios from 'axios';
import conf from '../conf';

export class PostService {
    constructor() {
        this.baseUrl = conf.apiUrl;
        this.currentPost = null;
        // this.apiKey = conf.apiKey;

        // the way i am sending axios requests i found out that i am not using this below code of apiClient
        this.apiClient = axios.create({
            baseURL: this.baseUrl,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                // 'API-Key': this.apiKey, // Uncomment if your server requires an API Key
            },
        });
    }

    // Create a new Post
    async createPost(data) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/posts`, data, {
                withCredentials: true,
                // i spend 1 hour on this because i did not sending request using this headers but this is necessary 
                // because i am sending images as well
                // but when you see in network tab in payload it does not show images array but it is sending images
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            this.currentPost = response.data;
            return this.currentPost;
        } catch (error) {
            // console.error("PostService :: createPost :: error", error?.response?.data?.message || error.message);
            throw error;
        }
    }

    // Update an existing Post
    async updatePost(postId, updatedPost) {
        try {
            const response = await axios.put(`${this.baseUrl}/api/posts/${postId}`, updatedPost, {
                withCredentials: true,
                // i spend 1 hour on this because i did not sending request using this headers but this is necessary 
                // because i am sending images as well
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            this.currentPost = response.data;
            return this.currentPost;
        } catch (error) {
            console.error("PostService :: updatePost :: error", error);
            throw error;
        }
    }

    // Delete a Post
    async deletePost(postId) {
        try {
            const response = await axios.delete(`${this.baseUrl}/api/posts/${postId}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("PostService :: deletePost :: error", error);
            throw error;
        }
    }

    // Get a single Post by ID
    async getPost(postId) {
        try {
            const response = await axios.get(`${this.baseUrl}/api/posts/${postId}`);
            return response.data;
        } catch (error) {
            console.error("PostService :: getPost :: error", error);
            throw error;
        }
    }

    // Get all Posts
    async getAllPosts() {
        try {
            const response = await axios.get(`${this.baseUrl}/api/posts`);
            return response.data;
        } catch (error) {
            console.error("PostService :: getAllPosts :: error", error);
            throw error;
        }
    }

    // Get My Posts
    async getMyAllPosts() {
        try {
            const response = await axios.get(`${this.baseUrl}/api/posts/myposts`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("PostService :: getMyAllPosts :: error", error);
            throw error;
        }
    }

    // Like Post
    // example usage await postService.likePost("665a2d6fe44e3a57dfc1234c");
    async likePost(postId) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/posts/${postId}/like`, {
                withCredentials: true,
            });
            this.currentPost = response.data;
            return this.currentPost;
        } catch (error) {
            console.error("PostService :: likePost :: error", error);
            throw error;
        }
    }

    // Dislike Post
    // example usage await postService.disLikePost("665a2d6fe44e3a57dfc1234c");
    async disLikePost(postId) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/posts/${postId}/dislike`, {
                withCredentials: true,
            });
            this.currentPost = response.data;
            return this.currentPost;
        } catch (error) {
            console.error("PostService :: disLikePost :: error", error);
            throw error;
        }
    }

    // Featured a Post
    // example usage await postService.featuredPost("665a2d6fe44e3a57dfc1234c");
    async featuredPost(postId) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/posts/${postId}/feature`, {
                withCredentials: true,
            });
            this.currentPost = response.data;
            return this.currentPost;
        } catch (error) {
            console.error("PostService :: featuredPost :: error", error);
            throw error;
        }
    }

    // Search posts with filters and sortin
    // await postService.searchPosts({ category: "Plot" });
    async searchPosts(filters = {}) {
        // filters is a JS Object like this
        // { title: 'modern', category: 'House', sortBy: 'likes' }
        try {
            const queryParams = new URLSearchParams(filters).toString();
            // URLSearchParams(filters).toString() converts it to title=modern&category=House&sortBy=likes

            const response = await axios.get(`${this.baseUrl}/api/posts/search?${queryParams}`);

            return response.data;
        } catch (error) {
            console.error("PostService :: searchPosts :: error", error);
            throw error;
        }
    }
}

// Export an instance (singleton)
const postService = new PostService();
export default postService;

