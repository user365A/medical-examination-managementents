import axios from 'axios';

const handleCreatePatient = (data) => {
    try {
        return axios.post('http://localhost:8081/api/v1/create-patient', data)
    } catch (error) {
        console.error("An error occurred during login:", error);;
        throw error;
    }
}

const handleCreateSchedule = (data) => {
    try {
        return axios.post('http://localhost:8081/api/v1/create-schedule', data)
    } catch (error) {
        console.error("An error occurred during login:", error);;
        throw error;
    }
}

export { handleCreatePatient, handleCreateSchedule }