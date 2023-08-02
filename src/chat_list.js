async function fetchConversationData() {
  const token = getCookie("token");

  if (!token) {
    // 로그인이 필요한 경우 로그인 페이지로 이동
    alert("로그인이 필요합니다.");
    window.location.href = "https://gns0314.github.io/DRFchatbot_FE/login.html";
    return;
  }

  try {

      const csrftoken = getCookie("token");

      const url = `http://127.0.0.1:8000/chatbot/list/`;
  
      // API 요청
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${csrftoken}`, 
        },
      });
  
      const result = await response.json();
      console.log(result); 
      printConversation(result);
    } catch (err) {
      console.error("에러:", err);
    }
  }
  
  function printConversation(conversations) {
    const chatscreen = document.getElementById("chat-screen");

    for (const conversation of conversations) {
      const userMessage = document.createElement("div");
      userMessage.classList.add("user-chat");
      const chatContent = document.createElement("div");
      chatContent.classList.add("chat-content");
      chatContent.textContent = `${conversation.prompt}`;
      userMessage.appendChild(chatContent);
      chatscreen.appendChild(userMessage);
  
      const aiMessage = document.createElement("div");
      aiMessage.classList.add("ai-chat");
      const aichatContent = document.createElement("div");
      aichatContent.classList.add("chat-content")
      aichatContent.textContent = `${conversation.response}`;
      aiMessage.appendChild(aichatContent)
      chatscreen.appendChild(aiMessage);
  
    }
  }
  
  //  토큰을 쿠키에서 가져오는 함수
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
  
  // 페이지 로드 시 대화 기록 가져오기
  fetchConversationData();