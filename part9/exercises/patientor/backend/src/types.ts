export interface Diagnose {
    code: string
    name: string
    latin?: string
}
export enum healthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: healthCheckRating
}

interface OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {startDate: string, endDate: string}
}

interface HospitalEntry extends BaseEntry{
    type: "Hospital";
    discharge: {date: string, criteria: string}
}

export type Entry =
    | HealthCheckEntry
    | OccupationalHealthcareEntry
    | HospitalEntry;

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string,
    entries: Entry[]
}

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other= 'other'
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id">;