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
    $email = $_POST['email'];
    $recovery_code = $_POST['recovery_code'];
    $new_password = $_POST['new_password'];

    // جستجو برای ایمیل در پایگاه داده
    $sql = "SELECT * FROM information WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $stored_code = $row['recovery_code']; // کد بازیابی ذخیره‌شده در دیتابیس

        // مقایسه کد بازیابی وارد شده
        if ($recovery_code == $stored_code) {
            // کد بازیابی صحیح است، رمز عبور جدید را بروزرسانی کن
            $hashed_password = password_hash($new_password, PASSWORD_DEFAULT); // رمز عبور جدید هش شده
            $update_sql = "UPDATE information SET password = '$hashed_password' WHERE email = '$email'";
            if ($conn->query($update_sql) === TRUE) {
                echo "رمز عبور شما با موفقیت تغییر کرد.";
            } else {
                $error_message = "خطا در تغییر رمز عبور.";
            }
        } else {
            // کد بازیابی اشتباه است
            $error_message = "کد بازیابی نادرست است.";
        }
    } else {
        // ایمیل پیدا نشد
        $error_message = "ایمیل وارد شده معتبر نیست.";
    }
}

$conn->close();
?>

<!-- نمایش پیام خطا در صورت وجود -->
<?php if (!empty($error_message)): ?>
    <div class="error-message" style="color: red;">
        <?php echo $error_message; ?>
    </div>
<?php endif; ?>
