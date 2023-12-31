import { buttonchange } from "./button.js";
import { clear } from "./clear.js";
import { data } from "./data.js";
import { printQuestion, $chatList, questionData } from "./display.js";
import { apiPost } from "./api.js";
import { recipe, additional } from "./add_display.js";
import { cuisineType } from "./radio.js";

export const $form = document.querySelector("form");
const $input = document.querySelector("input");

// 사용자의 질문
let question;

// input에 입력된 값을 저장할 변수
let ingredient;

// 추천받을 가지수 저장할 변수
let num;

// input에 입력된 질문 받아오는 함수
$input.addEventListener("input", (e) => {
  question = e.target.value;
});

// 사용자의 질문을 객체를 만들어서 push
const sendQuestion = (question) => {
  if (question) {
    data.push({
      prompt: question,
    });
    questionData.push({
      prompt: question,
    });
  }
};

$form.addEventListener("submit", async (e) => {
  e.preventDefault(); // submit 이벤트의 기본 동작 막기

  // 토큰 가져오기
  const token = getCookie("token");

  if (!token) {
    // 로그인이 필요한 경우 로그인 페이지로 이동
    alert("로그인이 필요합니다.");
    window.location.href = "https://gns0314.github.io/DRFchatbot_FE/login.html";
    return;
  }

  if ($chatList.querySelectorAll(".answer").length >= 2) {
    // 답변 리스트 초기화 여부를 묻는 확인 메시지
    const confirmation = confirm("답변이 가득 찼습니다. 초기화 하시겠습니까?");

    if (confirmation) {
      clear(); // 초기화 함수 호출
    }
  } else {
    buttonchange();
    // 추가 질문이 있는 경우

    ingredient = $input.value;
    num = document.getElementById("num").value;
    if (ingredient) {
      // 재료에 대한 입력이 있는 경우
      sendQuestion(
        `냉장고에 ${ingredient}가 있고 나는 ${cuisineType}을 만들고 싶어 ${ingredient}로 만들 수 있는 ${cuisineType}을 ${num}가지 메뉴만추천해줘.`
      );
    } else if (!ingredient && $chatList.querySelectorAll(".answer").length < 1) {
      // 재료에 대한 입력이 없는 경우
      sendQuestion(
        `가정집에서 간단하게 만들수있는 ${cuisineType}을 ${num}가지 메뉴만추천해줘`
      );
    } else if (additional) {
      // 추가 질문이 있는경우
      recipe();
      sendQuestion(
        `너가 위에서 추천해준 ${additional}에 대한 자세한 레시피를 알고싶어`
      );
    } else if (!additional) {
      // 추가 질문이 없는 경우
      recipe();
      sendQuestion(
        `너가 위에서 추천해준${num}가지 메뉴중에 너가 메뉴 한개 추천해주고 그 추천해주는 음식에 대한 자세한 레시피를 알고싶어`
      );
    }
    $input.value = null;
    printQuestion();
    apiPost();
  }
});

// 토큰을 쿠키에서 가져오는 함수
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
