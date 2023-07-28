import { printAnswer } from "./display.js";
import { data } from "./data.js";

// openAI API
let url = `http://127.0.0.1:8000/chatbot/`;

// api 요청보내는 함수
export const apiPost = async () => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const result = await response.json();
    console.log(result);
    printAnswer(result.choices[0].message.content);
  } catch (err) {
    console.error("Error:", err);
  }
};