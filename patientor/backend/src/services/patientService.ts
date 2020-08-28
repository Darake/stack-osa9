import uid from 'uid';
import patientData from '../../data/patients';
import { Patient, NewPatientEntry, PublicPatient, NewEntry } from '../types';

let patients: Array<Patient> = patientData as Array<Patient>;

const getNonSensitiveEntries = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => (
    { id, name, dateOfBirth, gender, occupation, entries }
  ));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id)
  return patient
}

const addPatient = (newEntry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uid(),
    ...newEntry,
    entries: []
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

const addEntry = (id: string, newEntry: NewEntry): Patient | undefined => {
  const newEntryWithId = {
    id: uid(),
    ...newEntry
  }

  const patientToUpdate = patients.find(patient => patient.id === id)

  if (!patientToUpdate) return

  const updatedPatient = { ...patientToUpdate, entries: patientToUpdate?.entries.concat(newEntryWithId) }

  patients = patients.map(patient => patient.id === id ? updatedPatient : patient)

  console.log(newEntryWithId)
  console.log(updatedPatient)
  console.log(patientToUpdate)
  console.log(patients)

  return updatedPatient
}

export default { getNonSensitiveEntries, addPatient, getPatient, addEntry };