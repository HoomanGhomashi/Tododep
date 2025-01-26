<?php
// اتصال به پایگاه داده
$conn = new mysqli("localhost", "root", "", "users");

// بررسی خطا در اتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];

    // جستجو برای ایمیل در پایگاه داده
    $sql = "SELECT * FROM information WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // ایمیل پیدا شد
        $row = $result->fetch_assoc();
        $username = $row['username'];

        // تولید کد بازیابی
        $recovery_code = rand(100000, 999999); // یک کد تصادفی

        // ذخیره کد بازیابی در پایگاه داده
        $update_sql = "UPDATE information SET recovery_code = '$recovery_code' WHERE email = '$email'";
        $conn->query($update_sql);

        // ارسال ایمیل به کاربر
        $subject = "بازیابی رمز عبور";
        $message = "سلام $username,\n\nبرای بازیابی رمز عبور خود، کد بازیابی شما: $recovery_code";
        $headers = "From: no-reply@yourwebsite.com";

        if (mail($email, $subject, $message, $headers)) {
            echo "کد بازیابی به ایمیل شما ارسال شده است.";
        } else {
            echo "ارسال ایمیل با مشکل مواجه شد.";
        }
    } else {
        // ایمیل پیدا نشد
        echo "این ایمیل در سیستم ثبت نشده است.";
    }
}

$conn->close();
?>
