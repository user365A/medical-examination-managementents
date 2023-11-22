import axios from 'axios';

const handleGetAllDoctor = () => {
    try {
        return axios.get('http://localhost:8081/api/v1/doctors')
    } catch (error) {
        console.error("An error occurred during login:", error);;
        throw error;
    }
}

export { handleGetAllDoctor }