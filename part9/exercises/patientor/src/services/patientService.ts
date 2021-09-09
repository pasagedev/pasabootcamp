import { NewPatientEntry, NonSensitivePatientData, Patient } from "../types";
import patients from "../../data/patients";
import {v4 as uuidv4} from 'uuid';

const getAll = (): NonSensitivePatientData[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addNew = (entry: NewPatientEntry):Patient  => {
    const isPatient = patients.some(p => p.ssn === entry.ssn);
    if (isPatient) throw new Error('Patient already exists');
    
    const newPatientEntry = {
        id: uuidv4(),
        ...entry
    };
    patients.push(newPatientEntry);
    return (newPatientEntry);
};

export default{
    getAll,
    addNew
};