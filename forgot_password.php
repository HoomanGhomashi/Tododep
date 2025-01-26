<?php
// اتصال به پایگاه داده
$conn = new mysqli("localhost", "root", "", "users");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $recovery_code = $_POST['recovery_code'];
    $new_password = $_POST['new_password'];

    // جستجو برای کد بازیابی و ایمیل
    $sql = "SELECT * FROM information WHERE email = '$email' AND recovery_code = '$recovery_code'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // کد بازیابی صحیح است
        // بروزرسانی رمز عبور
        $update_sql = "UPDATE information SET password = '$new_password', recovery_code = NULL WHERE email = '$email'";
        if ($conn->query($update_sql) === TRUE) {
            echo "رمز عبور با موفقیت تغییر کرد.";
        } else {
            echo "خطا در تغییر رمز عبور.";
        }
    } else {
        echo "کد بازیابی نادرست است.";
    }
}

$conn->close();
?>
