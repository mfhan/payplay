const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

export const showArtists = async () => {
  try {
    const artists = await axios.get(`${BASE_URL}/artists`);
    return artists.data;
  } catch (e) {
    console.log(e.message);
  }
};

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
    const artist = await axios.put(`${BASE_URL}/artists/${id}`, data);
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
