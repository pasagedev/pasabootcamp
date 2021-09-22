import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { Patient } from '../types';
import {apiBaseUrl} from '../constants';
import {useStateValue} from '../state/state';
import { IconGender } from './IconGender';
import { updatePatient } from '../state';
import { PatientEntry } from './EntryPatient';

export const PatientDetails: React.FC = () => {
    const params = useParams<{id: string}>();
    const [state, dispatch] = useStateValue();

    const patient = state.patients[params.id];
    const [patientDetail,setPatientDetail] = useState<Patient | null>(patient);

    const fetchPatientDetail = async () => {
        const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${params.id}`);
        return patient;
    };
    useEffect(() => {
        if(!patient.ssn){
            void fetchPatientDetail()
                .then(patient => {
                    setPatientDetail(patient);
                    return patient;})
                .then(patient => dispatch(updatePatient(patient)));
        }
    },[]);

    return(
        !patientDetail? null:
        <div>
            <h2>{patientDetail.name} <IconGender gender={patientDetail.gender}/> </h2>
            <div>
                <div>ssn: {patientDetail.ssn}</div>
                <div>occupation: {patientDetail.occupation}</div>
            <h3>entries</h3>
            {!patientDetail.entries
                ? null
                :patientDetail.entries.map(e => <PatientEntry key={e.id} entry={e}/>)}
            </div>
        </div>
    );};