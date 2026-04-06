export type NewDiaryEntry = {
  weather: "sunny" | "rainy" | "cloudy" | "stormy" | "windy";
  visibility: "great" | "good" | "ok" | "poor";
  date: string;
  comment?: string;
};

export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

type DataError = {
  code: string;
  message: string;
  path: string | string[];
  values: string[];
};
export interface ValidationError {
  message: string;
  error: Record<string, DataError>;
}
