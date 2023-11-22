import axios from 'axios';

const handleGetScheduleByDoctor = (data) => {
    try {
        return axios.post('http://localhost:8081/api/v1/get-all-schedule', data)
    } catch (error) {
        console.error("An error occurred during login:", error);;
        throw error;
    }
}

const handleChangeStatus = (data) => {
    try {
        return axios.put('http://localhost:8081/api/v1/update-schedule', data)
    } catch (error) {
        console.error("An error occurred during login:", error);;
        throw error;
    }
}

export { handleGetScheduleByDoctor,handleChangeStatus }