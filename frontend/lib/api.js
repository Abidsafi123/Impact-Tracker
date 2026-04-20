import axios from "axios";
const api_url = "http://localhost:3000/api";

export const getAllProblems = async () => {
    try {
        const response = await axios.get(`${api_url}/problems`, {
            cache: "no-store",
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching problems:", error);
        throw error;
    }
}


export const getProblemById = async (id) => {
    try {
        const response = await axios.get(`${api_url}/problems/${id}`, {
            cache: "no-store",
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching problem:", error);
        throw error;
    }
}


export const createProblem = async (data) => {
    try {
        const response = await axios.post(`${api_url}/problems`, data, {
            cache: "no-store",
        });
        return response.data;
    } catch (error) {
        console.error("Error creating problem:", error);
        throw error;
    }
}

export const joinProblem = async (id, status) => {
    try {
        const response = await axios.put(`${api_url}/problems/${id}`, { status }, {
            cache: "no-store",
        });
        return response.data;
    } catch (error) {
        console.error("Error joining problem:", error);
        throw error;
    }
}


export const addProblemUpdate = async (id, text) => {
    try {
        const response = await axios.post(`${api_url}/problems/${id}/updates`, { text }, {
            cache: "no-store",
        });
        return response.data;
    } catch (error) {
        console.error("Error adding problem update:", error);
        throw error;
    }

}