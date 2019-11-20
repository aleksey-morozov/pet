import axios from 'axios';

const entry = 'https://dog.ceo/api/';

async function apiRequest(url) {
  const response = await axios.get(`${entry}${url}`);
  if (response.data.status && response.data.status === 'success') {
    return response.data.message;
  }
  throw new Error('Не корректный ответ API');
}

export default {
  async getAllBreeds() {
    return apiRequest('breeds/list/all');
  },
  async getDogByBreed({ name, sub }, limit = 5) {
    let breed = name;
    if (sub) {
      breed = `${breed}/${sub}`;
    }
    return apiRequest(`breed/${breed}/images/random/${limit}`);
  },
  async getDogsFromStorage() {
    const data = localStorage.getItem('FAVORITES');
    if (data) {
      return JSON.parse(data);
    }
    return [];
  },
  async saveDogsToStorage(dogs = []) {
    localStorage.setItem('FAVORITES', JSON.stringify(dogs));
  },
};
