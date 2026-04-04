import { Gender, type GenderType, type PatientorEntry } from "./data.ts";
import { randomUUID } from "crypto";

export const parsePatientorEntry = (object: unknown): PatientorEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const id = randomUUID();
    const newEntry: PatientorEntry = {
      id,
      name: stringParser(object.name),
      ssn: stringParser(object.ssn),
      occupation: stringParser(object.occupation),
      gender: genderParser(object.gender),
      dateOfBirth: dateParser(object.dateOfBirth),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const stringParser = (name: unknown): string => {
  if (!isString(name))
    throw new Error("Incorrect or missing visibility: " + name);
  return name;
};

const isGender = (gender: unknown): gender is GenderType => {
  return Object.values(Gender).includes(gender as GenderType);
};

const genderParser = (gender: unknown): GenderType => {
  if (!isGender(gender))
    throw new Error("Incorrect or missing gender: " + gender);

  return gender;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const dateParser = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};
