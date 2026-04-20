import axios from "axios";
const api_url = "http://localhost:5000/api/problems";

export const getAllProblems = async () => {
    try {
        const response = await axios.get(api_url);
        return response.data.problems;
    } catch (error) {
        console.error("Error fetching problems:", error);
        throw error;
    }
};


export const getProblemById = async (id) => {
    try {
        const response = await axios.get(`${api_url}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching problem:", error);
        throw error;
    }
}


export const createProblem = async (data) => {
    try {
        const response = await axios.post(`${api_url}`, data, {
            cache: "no-store",
        });
        return response.data;
    } catch (error) {
        console.error("Error creating problem:", error);
        throw error;
    }
}

export const joinProblem = async (id, name) => {
    try {
        const response = await axios.post(`${api_url}/${id}/join`, { name });
        return response.data;
    } catch (error) {
        console.error("Error joining problem:", error);
        throw error;
    }
}

export const addProblemUpdate = async (id, text) => {
    try {
        await axios.post(`${api_url}/${id}/update`, { text });
        return response.data;
    } catch (error) {
        console.error("Error adding problem update:", error);
        throw error;
    }

}


export const getProblemStatus = async (id) => {
    try {
        await axios.post(`${api_url}/${id}/status`);
        return response.data;
    } catch (error) {
        console.error("Error fetching problem updates:", error);
        throw error;
    }
}   