import React from 'react';
import { HospitalEntry as HospitalEntryType} from "../types";
import { Segment, Header } from "semantic-ui-react";
import { IconTypeEntry } from './IconTypeEntry';
import { DiagnosisCodes } from './DiagnosisCodes';
import { Discharge } from './Discharge';

export const HospitalEntry: React.FC<{entry: HospitalEntryType}> = ({entry}) => {
    const {date, description, type, discharge, diagnosisCodes} = entry;
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
                <DiagnosisCodes diagnosisCodes={diagnosisCodes} />
                <Discharge discharge={discharge}/>
            </Segment>
    );
};