import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getAll());
});

router.post('/', (req, res) => {
    try {
        const patientToAdd = toNewPatientEntry(req.body);

        const addedPatient = patientService.addNew(patientToAdd);
        res.json(addedPatient);
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
    
});
export default router;