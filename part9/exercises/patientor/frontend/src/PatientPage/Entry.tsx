import React from 'react';
import { Entry } from '../types';

export const PatientEntry: React.FC<{entry: Entry}> = ({entry}) => {
    const {date, description, diagnosisCodes} = entry;
    return (
        <div>
            {date} {description}
            <ul>
                {diagnosisCodes?.map(d => 
                    <li key= {d}>
                        {d}
                    </li>
                )}
            </ul>
        </div>
    );
};