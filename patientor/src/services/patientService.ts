import uid from 'uid';
import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient, NewPatientEntry } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ));
};

const addPatient = (newEntry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uid(),
    ...newEntry,
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

export default { getNonSensitiveEntries, addPatient };