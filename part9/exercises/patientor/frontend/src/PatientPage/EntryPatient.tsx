import React from 'react';
import { Entry as EntryType } from '../types';
import { HealthCheckEntry } from './HealthCheckEntry';
import { HospitalEntry } from './HospitalEntry';
import { OccupationalHealthcareEntry } from './OccupationalHealthcare';

export const PatientEntry: React.FC<{entry: EntryType}> = ({entry}) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />;
        case "Hospital": 
            return <HospitalEntry entry={entry}/> ;
        case "OccupationalHealthcare": 
            return <OccupationalHealthcareEntry entry={entry}/>;
        default:
            return null;
    }
};