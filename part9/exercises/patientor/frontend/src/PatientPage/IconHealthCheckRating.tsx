import React from 'react';
import { HealthCheckRating } from '../types';
import {Icon, SemanticCOLORS} from 'semantic-ui-react';


export const IconHealthCheckRating: React.FC<{healthCheckRating: HealthCheckRating}> = ({healthCheckRating}) => {
    const getIcon = (color: SemanticCOLORS) => {
        return <Icon size="large" name="heart" color={color}/>; 
    };
    const assertNever = (value: never) => {
        throw new Error(`Invalidad health check rating: ${JSON.stringify(value)}`);
    };

    switch (healthCheckRating) {
        case HealthCheckRating.Healthy:
            return getIcon('green'); 
        case HealthCheckRating.LowRisk:
            return getIcon('yellow');
        case HealthCheckRating.HighRisk:
            return getIcon('orange');
        case HealthCheckRating.CriticalRisk: 
            return getIcon('red');
        default:
            return assertNever(healthCheckRating);
    }
};
