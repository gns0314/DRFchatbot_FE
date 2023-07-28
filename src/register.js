const baseUrl = 'http://127.0.0.1:8000/user';

 // 회원가입
 document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch(`${baseUrl}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      window.location.href = '/ormi_project_1/login.html'
      const result = await response.json();
      console.log('회원가입 결과:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  });