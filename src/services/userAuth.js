
import axios from "axios";


const apiRequest = async (method, endpoint, data = null, params = {}) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BASE_URL}${endpoint}`;
    const options = {
      method,
      url: reqUrl,
      ...(data && { data }), 
      ...(method === 'GET' && { params }), 
    };

    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const registerUser  = async ({ name, email, password }) => {
 
  try{
    const response = await apiRequest("POST", "/auth/register", { name, email, password });
  return response?.email || null;
  }catch (error) {
    console.error(error);
    throw error; 
  }
};


export const loginUser  = async ({ email, password }) => {
  try {
    const response = await apiRequest("POST", "/auth/login", { email, password });
  if (response) {
    localStorage.setItem("proManageToken", response?.proManageToken);
    localStorage.setItem("email", response?.email);
    localStorage.setItem("name", response?.name);
    return response?.email || null;
  }
    
  } catch (error) {
    throw error; 
  }
  
};


export const updateUserName = async (email, name) => {
  const response = await apiRequest("PUT", "/auth/update/name", null, { email, name });
  return response; 
};


export const updateUserDetails = async (email, userDetails) => {
  const response = await apiRequest("PUT", "/auth/update/userDetails", userDetails, { email });
  return response?.updated === true;
};