let baseUrl = 'http://127.0.0.1:8000/user';

document.getElementById('logout-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`${baseUrl}/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // 로그아웃이 성공한 경우, 인덱스 페이지로 이동
      // 쿠키 삭제
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      window.location.href = 'https://gns0314.github.io/DRFchatbot_FE/index.html';
    } else {
      const result = await response.json();
      console.log('로그아웃 실패:', result);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});