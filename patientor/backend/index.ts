import express, { type Response } from "express";
import cors from "cors";
import data from "./lib/data.ts";
import patientorRouter from "./routers/patientor.router.ts";
import { type DiagnosisEntry } from "./lib/type.ts";
const app = express();

app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res: Response<DiagnosisEntry[]>) => {
  res.send(data.diagnoses);
});

app.use("/api/patients", patientorRouter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
