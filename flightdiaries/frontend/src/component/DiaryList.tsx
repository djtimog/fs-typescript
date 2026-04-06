import { useEffect, useState } from "react";
import type { NonSensitiveDiaryEntry } from "../types";
import diary from "../services/diary";

export default function DiaryList() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diary.getAll().then((data) => setDiaries(data));
  }, []);

  return (
    <div>
      <h1> Diary entries</h1>
      {diaries.map((diary, ind) => (
        <div key={ind}>
          <h2>{diary.date}</h2>
          visibility: {diary.visibility}
          <br />
          weather: {diary.weather}
        </div>
      ))}
    </div>
  );
}
