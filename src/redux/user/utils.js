
export const setUserLocally = (userId) => {
  localStorage.setItem('user-authenticated', userId);
};

export const logoutUserLocally = () => {
  localStorage.removeItem('user-authenticated');
};
