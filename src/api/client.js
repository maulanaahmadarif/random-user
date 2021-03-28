import axios from 'axios'

const client = axios.create({
  baseURL: 'https://randomuser.me/api'
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status >= 500) {
        alert('SERVER ERROR')
      } else if (error.response.status === 404) {
        alert('NOT FOUND')
      }
    }
    // return Promise.reject(error);
    throw error;
  },
);

export default client;
