import { printAnswer } from "./display.js";
import { data } from "./data.js";

// Django 서버의 API URL
let url = `http://127.0.0.1:8000/chatbot/`;

// API 요청 함수
export const apiPost = async () => {
  try {
    // Django의 CSRF 토큰 가져오기
    const csrftoken = getCookie("csrftoken");
    

    // 요청 헤더에 CSRF 토큰 추가
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(data),
    });

    // if (!response.ok) {
    //   throw new Error("네트워크 응답이 올바르지 않습니다.");
    // }

    const result = await response.json();
    console.log(result);
    printAnswer(result.choices[0].message.content);
  } catch (err) {
    console.error("에러:", err);
  }
};

// CSRF 토큰을 쿠키에서 가져오는 함수
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
