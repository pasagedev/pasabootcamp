import React from 'react';
import { BaseEntry } from "../types";
import { List } from "semantic-ui-react";

export const DiagnosisCodes: React.FC<{diagnosisCodes: BaseEntry['diagnosisCodes']}> = ({diagnosisCodes}) => {
    if (!diagnosisCodes) return null;
    return(
        <div> 
            <h4>diagnosis codes</h4>
            <List bulleted as='ul' items={diagnosisCodes}/>
        </div>
    );   
};
