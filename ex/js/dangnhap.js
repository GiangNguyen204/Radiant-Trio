document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const alertBox = document.getElementById("alert-box");

    try {
        const response = await fetch("https://68188bb35a4b07b9d1cfa832.mockapi.io/login");
        const users = await response.json();

        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            alert("Đăng nhập thành công!");

            // Ghi nhớ người dùng nếu cần
            localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

            // Chuyển sang trang sản phẩm
            window.location.href = "sanpham.html";
        } else {
            alertBox.innerHTML = `<div class="alert alert-danger">Email hoặc mật khẩu không đúng!</div>`;
        }

    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        alertBox.innerHTML = `<div class="alert alert-danger">Không thể kết nối đến máy chủ!</div>`;
    }
});
