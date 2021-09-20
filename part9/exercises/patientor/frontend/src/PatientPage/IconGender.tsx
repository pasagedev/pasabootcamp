import React from 'react';
import { Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import { Gender } from '../types';

const iconGenderName = {
    [Gender.Female]: "venus",
    [Gender.Male]: "mars",
    [Gender.Other]: "other gender"
};

export const IconGender: React.FC<{gender: Gender}> = ({gender}) => {
    const name = iconGenderName[gender] as SemanticICONS;
    return(
        <Icon name={name}/>
    );
};