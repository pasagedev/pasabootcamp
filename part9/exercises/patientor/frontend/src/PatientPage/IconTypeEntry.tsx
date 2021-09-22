import React from 'react';
import { Entry } from '../types';
import {Icon, SemanticICONS} from 'semantic-ui-react';

type TypeEntry = Entry["type"];

export const IconTypeEntry: React.FC<{typeEntry: TypeEntry}> = ({typeEntry}) => {
    const getIcon = (name: SemanticICONS) => {
        return <Icon size="large" name={name}/>; 
    };
    const assertNever = (value: never) => {
        throw new Error(
            `Invalidad type entry: ${JSON.stringify(value)}`
            );
    };
    switch (typeEntry) {
        case "HealthCheck":
            return getIcon("user md"); 
        case "Hospital":
            return getIcon("hospital");
        case "OccupationalHealthcare":
            return getIcon("stethoscope");  
        default:
            return assertNever(typeEntry);
    }
};
