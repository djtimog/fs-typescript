import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Alert,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import type { Diagnosis, Entry, NewEntry, ValidationError } from "../../types";
import { HealthCheckRating } from "../../types";
import patientService from "../../services/patients";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  patientId: string;
  onEntryAdded: (entry: Entry) => void;
  onCancel: () => void;
  diagnosis: Diagnosis[];
}

export default function AddEntryForm({
  patientId,
  onEntryAdded,
  onCancel,
  diagnosis,
}: Props) {
  const [entryType, setEntryType] = useState<Entry["type"]>("HealthCheck");
  const [error, setError] = useState("");

  // shared fields
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  // Hospital
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const resetForm = () => {
    setDate("");
    setDescription("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setHealthCheckRating(0);
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
  };

  const buildEntry = (): NewEntry => {
    const base = {
      date,
      description,
      specialist,
      diagnosisCodes,
    };

    switch (entryType) {
      case "HealthCheck":
        return {
          ...base,
          type: "HealthCheck",
          healthCheckRating: healthCheckRating as HealthCheckRating,
        };
      case "Hospital":
        return {
          ...base,
          type: "Hospital",
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        };
      case "OccupationalHealthcare":
        return {
          ...base,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
              : undefined,
        };
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    try {
      const added = await patientService.addEntry(patientId, buildEntry());
      onEntryAdded(added);
      resetForm();
    } catch (err) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(err)) {
        const errorPath = err.response?.data?.error?.[0]?.path?.[0];
        setError(
          errorPath ? `Error: Incorrect ${errorPath}` : "Validation error",
        );
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ border: "2px dashed grey", borderRadius: 2, p: 3, mt: 2 }}
    >
      <Typography variant="h6" mb={2}>
        New {entryType} Entry
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Entry type selector */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="entry-type-label">Entry Type</InputLabel>
        <Select
          labelId="entry-type-label"
          value={entryType}
          label="Entry Type"
          onChange={({ target }) =>
            target.value && setEntryType(target.value as Entry["type"])
          }
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
        </Select>
      </FormControl>

      {/* Shared fields */}
      <TextField
        fullWidth
        required
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{ mb: 2 }}
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        fullWidth
        required
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        required
        label="Specialist"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosis-codes-label"
          multiple
          value={diagnosisCodes}
          onChange={({ target }) =>
            setDiagnosisCodes(
              typeof target.value === "string"
                ? target.value.split(",")
                : target.value,
            )
          }
          input={<OutlinedInput label="Diagnosis Codes" />}
          MenuProps={MenuProps}
        >
          {diagnosis.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code} — {d.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* HealthCheck fields */}
      {entryType === "HealthCheck" && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="health-check-rating-label">
            Health Check Rating
          </InputLabel>
          <Select
            labelId="health-check-rating-label"
            value={healthCheckRating}
            label="Health Check Rating"
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          >
            <MenuItem value={0}>0 — Healthy</MenuItem>
            <MenuItem value={1}>1 — Low Risk</MenuItem>
            <MenuItem value={2}>2 — High Risk</MenuItem>
            <MenuItem value={3}>3 — Critical Risk</MenuItem>
          </Select>
        </FormControl>
      )}

      {/* Hospital fields */}
      {entryType === "Hospital" && (
        <>
          <TextField
            fullWidth
            required
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Discharge Criteria"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
            sx={{ mb: 2 }}
          />
        </>
      )}

      {/* OccupationalHealthcare fields */}
      {entryType === "OccupationalHealthcare" && (
        <>
          <TextField
            fullWidth
            required
            label="Employer Name"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Sick Leave Start"
            placeholder="YYYY-MM-DD"
            value={sickLeaveStart}
            onChange={(e) => setSickLeaveStart(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Sick Leave End"
            placeholder="YYYY-MM-DD"
            value={sickLeaveEnd}
            onChange={(e) => setSickLeaveEnd(e.target.value)}
            sx={{ mb: 2 }}
          />
        </>
      )}

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button type="submit" variant="contained">
          Add
        </Button>
        <Button type="button" variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
