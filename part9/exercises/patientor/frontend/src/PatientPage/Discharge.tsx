import React from 'react';
import { HospitalEntry } from "../types";

export const Discharge: React.FC<{discharge: HospitalEntry['discharge']}> = ({discharge}) => {
    if (!discharge) return null;
    return(
        <div> 
            <h4>discharge</h4>
                {discharge.date} {discharge.criteria}
        </div>
    );   
};
