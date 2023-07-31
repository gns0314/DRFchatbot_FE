// login.js
const baseUrl = 'http://127.0.0.1:8000/user';

const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  let cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;samesite=lax`;

  if (window.location.protocol === 'https:') {
    cookie += ';secure';
  }

  document.cookie = cookie;
};

document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch(`${baseUrl}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('로그인 실패');
    }

    const result = await response.json();
    console.log('로그인 결과:', result);

    setCookie('token', result.token, 1);
    window.location.href = '/chat.html'; // 챗봇 페이지 URL로 변경
  } catch (error) {
    console.error('Error:', error);
  }
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
