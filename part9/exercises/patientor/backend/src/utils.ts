/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from "./types";

const isString = (text: any): text is string => {
    return (typeof text === 'string' || text instanceof String); 
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender  => {
    return Object.values(Gender).includes(gender);
};
const parseName = (name:any):string => {
    if(!name || !isString(name)) {
        throw new Error('Icorrect or missing name: ' + name);
    }
    return name;
};

const parseDateOfBirth = (date: any): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error('Icorrect or missing date: ' + date);
    }
    return date;
};

const parseSsn = (ssn: any): string => {
    if(!ssn || !isString(ssn)){
        throw new Error('Icorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

const parseGender = (gender: any): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Icorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Icorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };

};

export default toNewPatientEntry;
