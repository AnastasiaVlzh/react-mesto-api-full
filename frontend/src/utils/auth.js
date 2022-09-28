export const BASE_URL = 'http://localhost:4000';

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));
};

const headers = {
  'Content-Type': 'application/json',
};

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    headers,
    credentials:"include",
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
    .then(res => checkResponse(res));
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    headers,
    credentials:"include",
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
    .then(res => checkResponse(res));
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers,
    credentials:"include",
  })
    .then((res) => {
       return checkResponse(res)
    });
};