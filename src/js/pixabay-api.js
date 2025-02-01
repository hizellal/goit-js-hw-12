const API_KEY = '48415738-453a35c27b5ce388251d5c099';
const BASE_URL = 'https://pixabay.com/api/';

export function serviceImages(question, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: question,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  });

  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json(); 
  });
}