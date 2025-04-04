const API_BASE_URL = "http://localhost:5000/api"; // Update for deployment

const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) throw new Error("Network Error");
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

const axiosRequest = async (method, endpoint, data, auth = false) => {
    const headers = auth
        ? { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        : {};

    try {
        const response = await axios({
            method,
            url: `${API_BASE_URL}/${endpoint}`,
            data,
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return null;
    }
};

const API = {
    register: (userData) => axiosRequest("POST", "auth/register", userData),
    login: (userData) => axiosRequest("POST", "auth/login", userData),
    getCourses: () => fetchData("courses"),
    createCourse: (courseData) => axiosRequest("POST", "courses", courseData, true),
    deleteCourse: (courseId) => axiosRequest("DELETE", `courses/${courseId}`, null, true),
    submitAssignment: (assignmentData) => axiosRequest("POST", "assignments", assignmentData, true),
};

export default API;
