import type { CoursePart } from "../types";
import Part from "./Part";

export default function Content({
  courseParts,
}: {
  courseParts: CoursePart[];
}) {
  return (
    <div>
      {courseParts.map((part) => (
        <Part part={part} key={part.kind} />
      ))}
    </div>
  );
}
