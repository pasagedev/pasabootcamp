import { NewPatientEntry, PublicPatient, Patient } from "../types";
import patients from "../../data/patients";
import {v4 as uuidv4} from 'uuid';

const getAll = (): PublicPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getOneById = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addNew = (entry: NewPatientEntry):Patient => {
    const isPatient = patients.some(p => p.ssn === entry.ssn);
    if (isPatient) throw new Error('Patient already exists');
    
    const newPatientEntry = {
        ...entry,
        id: uuidv4(),
        entries: []
    };
    patients.push(newPatientEntry);
    return (newPatientEntry);
};

export default{
    getAll,
    addNew,
    getOneById
};