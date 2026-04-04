import data from "../lib/data.ts";
import { randomUUID } from "crypto";
import { type NewPatientorEntry, type PatientorEntry } from "../lib/type.ts";

const getAll = (): Omit<PatientorEntry, "ssn">[] => {
  const patientors = data.patientors;
  return patientors.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

const create = (patient: NewPatientorEntry): PatientorEntry => {
  const id = randomUUID();

  const newPatient = {
    id,
    ...patient,
  };

  data.patientors.push(newPatient);

  return newPatient;
};

export const patientService = { getAll, create };
