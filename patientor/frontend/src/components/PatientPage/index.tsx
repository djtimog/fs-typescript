import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import { useEffect, useState } from "react";
import { type Diagnosis, type Entry, type Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryDetails from "./EntryDetails";
import { Button } from "@mui/material";
import AddEntryForm from "./AddEntryForm";

function PatientPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    diagnosisService.getAll().then((data) => setDiagnosis(data));
    if (id) {
      patientService.getById(id).then((data) => {
        setPatient(data);
      });
    }
  }, [id]);

  const handleEntryAdded = (entry: Entry) => {
    setPatient((prev) =>
      prev ? { ...prev, entries: prev.entries.concat(entry) } : prev,
    );
    setShowForm(false);
  };

  if (!patient || !id) {
    return <p>Patient not found</p>;
  }

  return (
    <div>
      <h1>
        {patient.name}
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </h1>
      ssn: {patient.ssn} <br />
      occupation: {patient.occupation} <br />
      date of birth: {patient.dateOfBirth}
      <div>
        <h4>entries</h4>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            <EntryDetails entry={entry} />
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {code} {diagnosis.find((diag) => diag.code === code)?.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {showForm ? (
        <AddEntryForm
          patientId={id}
          diagnosis={diagnosis}
          onEntryAdded={handleEntryAdded}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <Button
          variant="contained"
          onClick={() => setShowForm(true)}
          sx={{ mt: 2 }}
        >
          Add New Entry
        </Button>
      )}
    </div>
  );
}

export default PatientPage;
