const conf = {
    apiKey: import.meta.env.VITE_API_KEY,
    apiUrl: import.meta.env.VITE_BASE_URL,
    baseUrl: import.meta.env.VITE_BASE_URL,
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  };
  
  export default conf;
  


//import conf from '../conf';

//console.log(config.apiUrl); // 👉 logs your API URL

// You can now use it like:
// fetch(`${config.apiUrl}/endpoint`)
