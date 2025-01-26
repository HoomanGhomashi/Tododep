<?php
// اطلاعات اتصال به پایگاه داده
$servername = "sql307.infinityfree.com";  // آدرس سرور پایگاه داده
$username = "if0_38028828";              // نام کاربری پایگاه داده
$password = "yo2OMdawx2e";               // رمز عبور پایگاه داده
$dbname = "if0_38028828_XXX";            // نام پایگاه داده

// اتصال به پایگاه داده
$conn = new mysqli($servername, $username, $password, $dbname);

// بررسی خطا در اتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// دریافت اطلاعات از فرم
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['username'];
    $pass = $_POST['password'];
    $verif_password = $_POST['verif_password'];
    $email = $_POST['email'];

    // بررسی اینکه نام کاربری یا ایمیل قبلاً ثبت شده است
    $check_user_sql = "SELECT * FROM information WHERE username = ? OR email = ?";
    $stmt = $conn->prepare($check_user_sql);
    $stmt->bind_param("ss", $user, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "نام کاربری یا ایمیل قبلاً ثبت شده است!";
        exit;
    }

    // بررسی تطابق رمز عبور
    if ($pass !== $verif_password) {
        echo "رمز عبور و تایید رمز عبور مطابقت ندارند!";
        exit;
    }

    // رمزنگاری رمز عبور
    $password_hashed = password_hash($pass, PASSWORD_DEFAULT);

    // ذخیره اطلاعات در جدول
    $sql = "INSERT INTO information (username, password, email) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $user, $password_hashed, $email);

    if ($stmt->execute()) {
        echo "ثبت‌نام با موفقیت انجام شد!";
        header("Location: login.html");  // هدایت به صفحه ورود پس از موفقیت
        exit;
    } else {
        echo "خطا در ثبت‌نام: " . $stmt->error;
    }
}

$conn->close();
?>
