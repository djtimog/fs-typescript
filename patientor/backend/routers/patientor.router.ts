import express, { type Request, type Response } from "express";
import { errorMiddleware, newPatientorParser } from "../lib/middleware.ts";
import { type PatientorEntry } from "../lib/type.ts";
import { patientService } from "../services/patientor.service.ts";

const patientorRouter = express.Router();

patientorRouter.get(
  "/",
  (_req, res: Response<Omit<PatientorEntry, "ssn">[]>) => {
    const data = patientService.getAll();
    res.send(data);
  },
);

patientorRouter.post(
  "/",
  newPatientorParser,
  (
    req: Request<unknown, unknown, PatientorEntry>,
    res: Response<PatientorEntry>,
  ) => {
    const createdPatientorEntry = patientService.create(req.body);
    res.send(createdPatientorEntry);
  },
);

patientorRouter.use(errorMiddleware);

export default patientorRouter;
