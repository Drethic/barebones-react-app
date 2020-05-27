const getUserFromToken = (token) => {
  const tokenParts = token.split('.');
  if (tokenParts.length < 2) {
    return null;
  }
  try {
    const userData = JSON.parse(atob(tokenParts[1]));
    return userData;
  } catch {
    return null;
  }
};

export default getUserFromToken;
