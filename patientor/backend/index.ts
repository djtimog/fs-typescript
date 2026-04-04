import express, { type Response } from "express";
import cors from "cors";
import data, { type PatientorEntry, type DiagnosisEntry } from "./lib/data.ts";
import { parsePatientorEntry } from "./lib/parser.ts";
// import { v1 as uuid } from "uuid";

const app = express();

app.use(express.json());
app.use(cors());
const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res: Response<DiagnosisEntry[]>) => {
  res.send(data.diagnoses);
});

app.get("/api/patients", (_req, res: Response<PatientorEntry[]>) => {
  res.send(data.patientors);
});

app.post("/api/patients", (req, res: Response<PatientorEntry>) => {
  const newPatientorEntry = parsePatientorEntry(req.body);
  res.send(newPatientorEntry);
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
