import axios from "axios";

const apiRequest = async (method, url, data = null) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BASE_URL}${url}`;
    const options = {
      method,
      url: reqUrl,
      ...(data && { data }),
    };

    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const saveTask = async (taskData) => {
  const response = await apiRequest("POST", "/task/add", taskData);
  localStorage.setItem("isTaskCreated", response?.isTaskCreated);
};

export const getTask = async (category, timeStamp, user) => {
  const url = `/task/getTask?category=${category || ""}&timeStamp=${timeStamp || ""}&user=${user || ""}`;
  const response = await apiRequest("GET", url);
  return Array.from(response?.data);
};

export const updateTaskQueueById = async (taskId, queue) => {
  const url = `/task/updateQueue?id=${taskId || ""}&queue=${queue || ""}`;
  const response = await apiRequest("PUT", url);
  if (response?.updated === true) {
    localStorage.setItem("queue", queue);
  }
  return response?.updated;
};

export const fetchTaskById = async (taskId) => {
  const url = `/task/getOne?id=${taskId || ""}`;
  const response = await apiRequest("GET", url);
  return response?.data;
};

export const updateTask = async (id, taskData) => {
  const url = `/task/update?id=${id || ""}`;
  await apiRequest("PUT", url, taskData);
};

export const deleteTask = async (id) => {
  const url = `/task/delete?id=${id || ""}`;
  const response = await apiRequest("DELETE", url);
  return response?.isDeleted;
};

export const getDetails = async (user) => {
  const url = `/task/getAnalyticsDetails?user=${user || ""}`;
  const response = await apiRequest("GET", url);
  return response?.data;
};

export const addUser  = async (email) => {
  try{
  const url = `/task/addUser?email=${email || ""}`;
  const response = await apiRequest("POST", url);
  return response?.isUserCreated;
}catch (error) {
  console.error(error);
  throw error; 
}
};

export const getAssignee = async () => {
  const url = `/task/getAssignee`;
  const response = await apiRequest("GET", url);
  return response?.data;
};