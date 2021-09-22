import React from 'react';
import { HealthCheckEntry as HealthCheckEntryType} from "../types";
import { Segment, Header } from "semantic-ui-react";
import { IconTypeEntry } from './IconTypeEntry';
import { IconHealthCheckRating } from './IconHealthCheckRating';
import { DiagnosisCodes } from './DiagnosisCodes';

export const HealthCheckEntry: React.FC<{entry:HealthCheckEntryType}> = ({entry}) => {
    const {date, description, type, healthCheckRating, diagnosisCodes} = entry;
    return (
            <Segment>
                <Header>
                    <Header.Content as="h3">
                        {date} 
                        <IconTypeEntry typeEntry={type}/>
                    </ Header.Content>
                    <Header.Subheader>
                        {description}
                    </Header.Subheader>
                </Header>
                <IconHealthCheckRating healthCheckRating={healthCheckRating} />
                <DiagnosisCodes diagnosisCodes={diagnosisCodes} />
            </Segment>
    );
};