import { useState, useEffect } from "react";
import "./ContrastChecker.css";

export default function ContrastChecker({ color }) {
  const [contrastValue, setContrastValue] = useState(null);
  let score = "";
  const URL = "https://www.aremycolorsaccessible.com/api/are-they";

  console.log(color.hex, color.contrastText);

  useEffect(() => {
    async function postFetch() {
      try {
        const response = await fetch(URL, {
          method: "POST",
          body: JSON.stringify({ colors: [color.hex, color.contrastText] }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        console.log("data: ", data.overall);
        score = data.overall;
        console.log("score: ", score);
        setContrastValue(data);
      } catch (error) {
        console.error("Error fetching contrast data: ", error);
      }
    }
    postFetch();
  }, [color]);

  return contrastValue ? (
    contrastValue.overall === "Nope" ? (
      <p className="contrast-score-notOk">
        Overall Contrast Score: {contrastValue.overall}
      </p>
    ) : contrastValue.overall === "Yup" ? (
      <p className="contrast-score">
        Overall Contrast Score: {contrastValue.overall}
      </p>
    ) : (
      <p className="contrast-score-couldBetter">
        Overall Contrast Score: {contrastValue.overall}
      </p>
    )
  ) : (
    <p className="contrast-score">Loading ...</p>
  );
}
