import type React from "react";
import { useState } from "react";
import type { NewDiaryEntry, ValidationError } from "../types";
import diary from "../services/diary";
import Notification from "./Notification";
import axios from "axios";

export default function DiaryForm() {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<
    NewDiaryEntry["visibility"] | string
  >("");
  const [weather, setWeather] = useState<NewDiaryEntry["weather"] | string>("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibility as NewDiaryEntry["visibility"],
      weather: weather as NewDiaryEntry["weather"],
      comment,
    };

    try {
      await diary.create(newEntry);
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
      setMessage("");
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        const errorPath = error.response?.data?.error?.[0]?.path?.[0];
        setMessage(`Error: Incorrect ${errorPath}`);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      <Notification message={message} />
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>

        <div>
          <fieldset>
            <legend>Visibility</legend>
            {["great", "good", "ok", "poor"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="visibility"
                  value={option}
                  checked={visibility === option}
                  onChange={(e) => setVisibility(e.target.value)}
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            ))}
          </fieldset>
        </div>

        <div>
          <fieldset>
            <legend>Weather</legend>
            {["sunny", "cloudy", "rainy", "stormy"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="weather"
                  value={option}
                  checked={weather === option}
                  onChange={(e) => setWeather(e.target.value)}
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            ))}
          </fieldset>
        </div>

        <div>
          <label>
            Comment:
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
