async function fetchConversationData() {
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
  
      if (!response.ok) {
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }
  
      const result = await response.json();
      console.log(result); 
      printConversation(result);
    } catch (err) {
      console.error("에러:", err);
    }
  }
  
  function printConversation(conversations) {
    const conversationContainer = document.getElementById("conversationContainer");

    for (const conversation of conversations) {
      const userMessage = document.createElement("div");
      userMessage.textContent = `User: ${conversation.prompt}`;
      conversationContainer.appendChild(userMessage);
  
      const aiMessage = document.createElement("div");
      aiMessage.textContent = `AI: ${conversation.response}`;
      conversationContainer.appendChild(aiMessage);
  
      const separator = document.createElement("hr");
      conversationContainer.appendChild(separator);
    }
  }
  
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
  
  // 페이지 로드 시 대화 기록 가져오기
  fetchConversationData();