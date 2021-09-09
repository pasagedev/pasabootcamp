export interface Diagnose {
    code: string
    name: string
    latin?: string
}

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
}

export enum Gender {
    female = 'female',
    male = 'male'
}

export type NonSensitivePatientData = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">;