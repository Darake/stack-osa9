import uid from 'uid';
import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient, NewPatientEntry, PublicPatient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => (
    { id, name, dateOfBirth, gender, occupation, entries }
  ));
};

const getPatient = (id: string): PublicPatient | undefined => {
  const patient = patients.find(patient => patient.id === id)
  if (patient) patient.entries = []
  return patient
}

const addPatient = (newEntry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uid(),
    ...newEntry,
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

export default { getNonSensitiveEntries, addPatient, getPatient };