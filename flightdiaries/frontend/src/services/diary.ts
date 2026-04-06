import axios from "axios";
import type {
  DiaryEntry,
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
} from "../types";

const getAll = async () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>("http://localhost:3000/api/diaries")
    .then((res) => res.data as NonSensitiveDiaryEntry[]);
};

const create = async (entry: NewDiaryEntry) => {
  return await axios.post<DiaryEntry>(
    "http://localhost:3000/api/diaries",
    entry,
  );
};

export default {
  getAll,
  create,
};
