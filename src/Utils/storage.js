const TOKEN_KEY = 'access_token';
const USER_KEY = 'user_data';

const setAccessToken = (token) => {
  try {
    if (token !== null) {
      localStorage.setItem(TOKEN_KEY, token);
      console.log('Access token stored successfully');
    } else {
      localStorage.removeItem(TOKEN_KEY);
      console.warn('Attempted to store a null token');
    }
  } catch (e) {
    console.error('Error storing access token:', e);
  }
};

// const getAccessToken = () => {
//   try {
//     return localStorage.getItem(TOKEN_KEY);
//   } catch (e) {
//     console.error('Error retrieving access token:', e);
//     return null;
//   }
// };
const getAccessToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY); // Return the token
  } catch (e) {
    console.error('Error retrieving access token:', e);
    return null;
  }
};


const setUserData = (user) => {
  try {
    if (user !== null) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      console.log('User data stored successfully');
    } else {
      localStorage.removeItem(USER_KEY);
      console.warn('Attempted to store null user data');
    }
  } catch (e) {
    console.error('Error storing user data:', e);
  }
};

const getUserData = () => {
  try {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error('Error retrieving user data:', e);
    return null;
  }
};

const removeAccessToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    console.log('Access token removed successfully');
  } catch (e) {
    console.error('Error removing access token:', e);
  }
};

const removeUserData = () => {
  try {
    localStorage.removeItem(USER_KEY);
    console.log('User data removed successfully');
  } catch (e) {
    console.error('Error removing user data:', e);
  }
};

export {
  setAccessToken,
  getAccessToken,
  setUserData,
  getUserData,
  removeAccessToken,
  removeUserData
};
