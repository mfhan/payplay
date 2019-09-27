const axios = require('axios');

const BASE_URL = 'http://payplay.herokuapp.com';

const api = axios.create({
  baseURL: BASE_URL
})


export const loginUser = async (loginData) => {
  const resp = await api.post(`/auth/login`, loginData);
  return resp.data
}

export const registerUser = async (formData) => {
  const resp = await api.post('/auth/register', formData);
  localStorage.setItem('jwt', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user;
};

export const verifyUser = async (token) => {
  api.defaults.headers.common.authorization = `Bearer ${token}`
  const resp = await api.post('/auth/verify');
  return resp.data
}

// export const registerUser = async (registerData) => {
//   const resp = await api.post(`/artists/register`, registerData);
//   return resp.data;
// }

// export const register = async (formData) => {
//   const resp = await api.post('/auth/register', formData);
//   localStorage.setItem('authToken', resp.data.token);
//   api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
//
//   return resp.data.user;
// };
//
// export const login = async (formData) => {
//   const resp = await api.post('./auth/login', formData);
//   return resp.data.user;
// };


export const showArtists = async () => {
  try {
    const artists = await axios.get(`${BASE_URL}/artists`);
    return artists.data;
  } catch (e) {
    console.log(e.message);
  }
};


export const showOneArtist = async (id) => {
  const resp = await api(`/artists/${id}`)
  return resp.data;
}

export const createArtist = async (data) => {
  try {
    const artist = await axios.post(`${BASE_URL}/artists`, data);
    return artist.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const updateArtist = async (data, id) => {
  try {
    const artist = await api.put(`${BASE_URL}/artists/${id}`, data);
    return artist.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const destroyArtist = async (id) => {
  try {
    const artist = await axios.delete(`${BASE_URL}/artists/${id}`);
    return artist.data;
  } catch (e) {
    console.log(e.message);
  }
};
