document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Kiểm tra đầu vào rỗng
  if (!username || !email || !password) {
      showAlert('Vui lòng nhập đầy đủ thông tin.', 'danger');
      return;
  }

  // Kiểm tra độ dài mật khẩu
  if (password.length < 8) {
      showAlert('Mật khẩu phải có ít nhất 8 ký tự.', 'warning');
      return;
  }

  const newUser = {
      username: username,
      email: email,
      password: password,
      createdAt: new Date().toISOString()
  };

  try {
      const response = await fetch('https://68188bb35a4b07b9d1cfa832.mockapi.io/login', { // ← Thay URL tại đây
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
      });

      if (response.ok) {
          showAlert('Đăng ký thành công!', 'success');
          document.getElementById('registerForm').reset();
          window.location.href = "dangnhap.html";
      } else {
          showAlert('Đăng ký thất bại. Vui lòng thử lại.', 'danger');
      }
  } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      showAlert('Có lỗi xảy ra khi gửi dữ liệu.', 'danger');
  }
});

function showAlert(message, type) {
  const alertBox = document.getElementById('alert-box');
  alertBox.innerHTML = `
      <div class="alert alert-${type}" role="alert">
          ${message}
      </div>
  `;
  setTimeout(() => alertBox.innerHTML = '', 3000);
}
