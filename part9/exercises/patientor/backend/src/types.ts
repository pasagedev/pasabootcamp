export interface Diagnose {
    code: string
    name: string
    latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

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
    female = 'female',
    male = 'male',
    other= 'other'
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id">;