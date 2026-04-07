// src/components/EntryDetails.tsx
import { Favorite, Work, LocalHospital } from "@mui/icons-material";
import { Entry } from "../../types";
import { assertNever } from "../../utils";

const healthRatingColor = (rating: number) => {
  switch (rating) {
    case 0:
      return "green";
    case 1:
      return "yellow";
    case 2:
      return "orange";
    case 3:
      return "red";
    default:
      return "grey";
  }
};

const HealthCheckDetails = ({
  entry,
}: {
  entry: Extract<Entry, { type: "HealthCheck" }>;
}) => (
  <div>
    <Favorite style={{ color: healthRatingColor(entry.healthCheckRating) }} />
    <p>diagnose by {entry.specialist}</p>
  </div>
);

const HospitalDetails = ({
  entry,
}: {
  entry: Extract<Entry, { type: "Hospital" }>;
}) => (
  <div>
    discharged: {entry.discharge.date} — {entry.discharge.criteria}
    <p>diagnose by {entry.specialist}</p>
  </div>
);

const OccupationalDetails = ({
  entry,
}: {
  entry: Extract<Entry, { type: "OccupationalHealthcare" }>;
}) => (
  <div>
    {entry.sickLeave && (
      <p>
        Sick leave: {entry.sickLeave.startDate} – {entry.sickLeave.endDate}
      </p>
    )}
    <p>diagnose by {entry.specialist}</p>
  </div>
);

const entryIcon = (entry: Entry) => {
  switch (entry.type) {
    case "HealthCheck":
      return <LocalHospital />;
    case "Hospital":
      return <LocalHospital />;
    case "OccupationalHealthcare":
      return <Work />;
    default:
      return assertNever(entry);
  }
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <fieldset>
          <p>
            {entry.date} {entryIcon(entry)} <br />
            <em>{entry.description}</em>
          </p>
          <HealthCheckDetails entry={entry} />
        </fieldset>
      );

    case "Hospital":
      return (
        <fieldset>
          <p>
            {entry.date} {entryIcon(entry)} <br /> <em>{entry.description}</em>
          </p>
          <HospitalDetails entry={entry} />
        </fieldset>
      );
    case "OccupationalHealthcare":
      return (
        <fieldset>
          <p>
            {entry.date} {entryIcon(entry)}
            <strong>{entry.employerName}</strong> <br />
            <em>{entry.description}</em>
          </p>
          <OccupationalDetails entry={entry} />
        </fieldset>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
