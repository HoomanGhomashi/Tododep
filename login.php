<?php
// اتصال به پایگاه داده
$conn = new mysqli("localhost", "root", "", "users");

// بررسی خطا در اتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// متغیر برای پیام خطا
$error_message = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // دریافت اطلاعات از فرم
    $username = $_POST['username'];
    $password = $_POST['password'];

    // جستجو برای نام کاربری در پایگاه داده
    $sql = "SELECT * FROM information WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // اگر کاربر پیدا شد، اطلاعات کاربر را دریافت کن
        $row = $result->fetch_assoc();
        $stored_password = $row['password'];

        // مقایسه رمز عبور وارد شده با رمز عبور ذخیره‌شده
        if ($password == $stored_password) {
            // رمز عبور درست است
            header("Location: index.html");
            exit;
        } else {
            // رمز عبور اشتباه است
            $error_message = "Invalid username or password!";
        }
    } else {
        // نام کاربری پیدا نشد
        $error_message = "Invalid username or password!";
    }
}

$conn->close();
?>