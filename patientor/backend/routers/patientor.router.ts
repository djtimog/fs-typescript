import express, { type Request, type Response } from "express";
import {
  errorMiddleware,
  newEntryParser,
  newPatientorParser,
} from "../lib/middleware.ts";
import { type NewEntry, type Patient } from "../lib/type.ts";
import { patientService } from "../services/patientor.service.ts";

const patientorRouter = express.Router();

patientorRouter.get("/", (_req, res: Response<Omit<Patient, "ssn">[]>) => {
  const data = patientService.getAll();
  res.send(data);
});

patientorRouter.post(
  "/",
  newPatientorParser,
  (req: Request<unknown, unknown, Patient>, res: Response<Patient>) => {
    const createdPatient = patientService.create(req.body);
    res.send(createdPatient);
  },
);

patientorRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const patient = patientService.findById(req.params.id);
  if (!patient) {
    res.status(404).json({ error: "Patient not found" });
    return;
  }

  res.json(patient);
});

patientorRouter.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response) => {
    const patient = patientService.findById(req.params.id);
    if (!patient) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }
    const newEntry = patientService.addEntry(req.params.id, req.body);
    res.status(201).json(newEntry);
  },
);

patientorRouter.use(errorMiddleware);

export default patientorRouter;
