import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

export default function Part({ part }: { part: CoursePart }) {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <div>{part.description}</div>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <div>{part.description}</div>
          <div>submit to {part.backgroundMaterial}</div>
        </div>
      );

    case "group":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <div>project exercise {part.groupProjectCount}</div>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <div>{part.description}</div>
          <div>required skills: {part.requirements.join(", ")}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
}
