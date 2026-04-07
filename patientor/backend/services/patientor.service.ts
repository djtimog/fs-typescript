import data from "../lib/data.ts";
import { randomUUID } from "crypto";
import {
  type Entry,
  type NewEntry,
  type NewPatient,
  type Patient,
} from "../lib/type.ts";

const getAll = (): Omit<Patient, "ssn">[] => {
  const patientors = data.patientors;
  return patientors.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
  }));
};

const create = (patient: NewPatient): Patient => {
  const id = randomUUID();

  const newPatient = {
    id,
    ...patient,
    entries: [],
  };

  data.patientors.push(newPatient);

  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = data.patientors.find((p) => p.id === id);
  if (!patient) {
    return undefined;
  }

  return patient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = data.patientors.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }
  const newEntry: Entry = { id: randomUUID(), ...entry };
  patient.entries.push(newEntry);
  return newEntry;
};

export const patientService = { getAll, create, findById, addEntry };
