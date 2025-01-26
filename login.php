<?php
// اطلاعات اتصال به پایگاه داده
$servername = "sql307.infinityfree.com"; // آدرس سرور پایگاه داده
$username = "if0_38028828";            // نام کاربری پایگاه داده
$password = "yo2OMdawx2e";             // رمز عبور پایگاه داده
$dbname = "if0_38028828_XXX";          // نام پایگاه داده

// اتصال به پایگاه داده
$conn = new mysqli($servername, $username, $password, $dbname);

// بررسی خطا در اتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// متغیر برای پیام خطا
$error_message = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // دریافت اطلاعات از فرم
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // محافظت از SQL Injection با استفاده از prepared statements
    $stmt = $conn->prepare("SELECT * FROM information WHERE username = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // اگر کاربر پیدا شد
        $row = $result->fetch_assoc();
        // مقایسه رمز عبور وارد شده با رمز عبور ذخیره‌شده
        if (password_verify($pass, $row['password'])) {
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
