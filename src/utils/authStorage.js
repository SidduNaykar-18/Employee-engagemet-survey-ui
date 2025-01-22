export const setAuthToken = (token) => {
    const expiresIn = 60 * 60 * 1000; 
    const expirationTime = Date.now() + expiresIn;
  
    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("authTokenExpiration", expirationTime);
};

export const setAuthTokenExpiration = (expirationTime) => {
    sessionStorage.setItem("authTokenExpiration", expirationTime);
};

export const getAuthToken = () => {
    return sessionStorage.getItem("authToken");
};

export const getAuthTokenExpiration = () => {
    return sessionStorage.getItem("authTokenExpiration");
};

export const isTokenExpired = () => {
    const expirationTime = getAuthTokenExpiration();
    if (!expirationTime) return true; 
  
    return Date.now() > expirationTime; 
};

export const clearAuthToken = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authTokenExpiration");
};
