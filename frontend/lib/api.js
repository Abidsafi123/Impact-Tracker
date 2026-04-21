import axios from "axios";

const api_url = "http://localhost:5000/api/problems";

// GET ALL
export const getAllProblems = async () => {
  try {
    const response = await axios.get(api_url);
    return response.data.problems;
  } catch (error) {
    console.error("Error fetching problems:", error);
    throw error;
  }
};

// GET BY ID
export const getProblemById = async (id) => {
  try {
    const response = await axios.get(`${api_url}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching problem:", error);
    throw error;
  }
};

// CREATE
export const createProblem = async (data) => {
  try {
    const response = await axios.post(api_url, data);
    return response.data;
  } catch (error) {
    console.error("Error creating problem:", error);
    throw error;
  }
};

// JOIN
export const joinProblem = async (id, name) => {
  try {
    const response = await axios.post(`${api_url}/${id}/join`, { name });
    return response.data;
  } catch (error) {
    console.error("Error joining problem:", error);
    throw error;
  }
};

// UPDATE
export const addProblemUpdate = async (id, text) => {
  try {
    const response = await axios.post(`${api_url}/${id}/update`, { text });
    return response.data;
  } catch (error) {
    console.error("Error adding update:", error);
    throw error;
  }
};

// STATUS
export const updateProblemStatus = async (id, status) => {
  try {
    const response = await axios.post(`${api_url}/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};