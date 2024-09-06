import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const register = (email, password) => {
  return axios.post(API_URL + 'signup', {
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + 'signin', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const updateProfile = (updates) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: 'Bearer ' + user.accessToken,
    },
  };

  return axios
    .put(API_URL + 'profile', updates, config)
    .then((response) => {
      const updatedUser = { ...user, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
};

const AuthService = {
  register,
  login,
  logout,
  updateProfile,
};

export default AuthService;
