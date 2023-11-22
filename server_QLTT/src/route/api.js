import express from "express";
import APIController from '../controller/APIController';

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/doctors', APIController.getAllDoctor); // method GET -> READ data
    router.post('/get-all-schedule', APIController.getAllSchedule); // method GET -> READ data
    router.post('/create-patient', APIController.createPatient); // method POST -> CREATE data
    router.post('/create-schedule', APIController.createSchedule); // method POST -> CREATE data

    router.put('/update-schedule', APIController.updateSchedule); //method PUT -> UPDATE data

    // router.put('/update-patient', APIController.updatePatient); //method PUT -> UPDATE data
    // router.delete('/delete-patient/:id', APIController.deletePatient); //method DELETE -> DELETE data


    return app.use('/api/v1/', router)
}


export default initAPIRoute;
