import axios from 'axios';

/**
 * Request Wrapper with default success/error actions
 */
const request = (apiBase, options) => {
  const client = axios.create({
    baseURL: apiBase,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onError = (error) => {
    console.log('Request Failed:', error.config);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else {
      console.log('Error Message:', error.message);
    }
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
