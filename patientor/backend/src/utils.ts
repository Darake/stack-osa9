/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, NewEntry, Diagnose, HealthCheckRating, Discharge, SickLeave } from './types';

const isString = (str: any): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name; ${name}`);
  }
  return name;
};

const parseStringDate = (dateOfBirth: any, name: string): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Icorrect or missing date of ${name}: ${dateOfBirth}`);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseStringDate(object.dateOfBirth, 'date of birth'),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
};

const parseString = (value: any, name: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${name}: ${value}`);
  }
  return value;
}

const parseDiagnosisCodes = (codes: any): Array<Diagnose['code']> => {
  if (!Array.isArray(codes)) {
    throw new Error('Incorrect type for diagnosis codes, should be array');
  }
  codes.forEach(code => {
    if (!isString(code)) {
      throw new Error(`Incorrect diagnosis code: ${code}`);
    }
  })
  return codes
}

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || ![1, 2, 3, 4, 'Healthy', 'LowRisk', 'HighRisk', 'CriticalRisk'].includes(rating)) {
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  }
  return HealthCheckRating[rating as keyof typeof HealthCheckRating]
}

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) throw new Error('Missin discharge')
  return {
    date: parseStringDate(discharge.date, 'date'),
    criteria: parseString(discharge.criteria, 'criteria')
  }
}

const parseSickLeave = (sickLeave: any): SickLeave => {
  return {
    startDate: parseStringDate(sickLeave.startDate, 'start date'),
    endDate: parseStringDate(sickLeave.endDate, 'end date'),
  }
}

const toNewEntry = (object: any): NewEntry => {
  const baseObject = {
    description: parseString(object.description, 'description'),
    date: parseStringDate(object.date, 'date'),
    specialist: parseString(object.specialist, 'specialist'),
    diagnosisCodes: object.diagnosisCodes && parseDiagnosisCodes(object.diagnosisCodes),
  }

  switch (object.type) {
    case 'HealthCheck':
      return {
        ...baseObject,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      }
    case 'Hospital':
      return {
        ...baseObject,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge),
      }
    case 'OccupationalHealthcare':
      return {
        ...baseObject,
        type: 'OccupationalHealthcare',
        employerName: parseString(object.employerName, 'employer name'),
        sickLeave: object.sickLeave && parseSickLeave(object.sickLeave)
      }
    default:
      throw new Error('Error')
  }
}

export { toNewPatientEntry, toNewEntry };