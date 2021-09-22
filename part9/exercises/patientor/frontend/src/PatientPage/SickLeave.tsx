import React from 'react';
import { OccupationalHealthcareEntry } from "../types";

export const SickLeave: React.FC<{sickLeave: OccupationalHealthcareEntry['sickLeave']}> = ({sickLeave}) => {
    if (!sickLeave) return null;
    return(
        <div> 
            <h4>sickLeve</h4>
                {sickLeave.startDate} - {sickLeave.endDate}
        </div>
    );   
};
