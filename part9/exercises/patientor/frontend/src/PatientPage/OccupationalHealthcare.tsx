import React from 'react';
import { OccupationalHealthcareEntry as OccupationalHealthcareEntryTrype} from "../types";
import { Segment, Header } from "semantic-ui-react";
import { IconTypeEntry } from './IconTypeEntry';
import { DiagnosisCodes } from './DiagnosisCodes';
import { SickLeave } from './SickLeave';

export const OccupationalHealthcareEntry: React.FC<{entry:OccupationalHealthcareEntryTrype}> = ({entry}) => {
    const {date, description, type, diagnosisCodes, sickLeave, employerName} = entry;
    return (
            <Segment>
                <Header>
                    <Header.Content as="h3">
                        {date} 
                        <IconTypeEntry typeEntry={type}/>
                        {employerName}
                    </ Header.Content>
                    <Header.Subheader>
                        {description}
                    </Header.Subheader>
                </Header>
                <DiagnosisCodes diagnosisCodes={diagnosisCodes} />
                <SickLeave sickLeave={sickLeave}/>
            </Segment>
    );
};