import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body);
  const addedEntry = patientService.addPatient(newPatientEntry);
  res.json(addedEntry);
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id)
  res.json(patient)
})

router.post('/:id/entries', (req, res) => {
  const newEntry = toNewEntry(req.body);
  const updatedPatient = patientService.addEntry(req.params.id, newEntry)

  if (!updatedPatient) return res.status(404).send('Patient not found')
  
  return res.json(updatedPatient)
})

export default router;