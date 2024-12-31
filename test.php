<?php
// اتصال به پایگاه داده
$conn = new mysqli("localhost", "root", "", "users");

// بررسی خطا در اتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// آماده‌سازی و اجرای کوئری
$sql = $conn->prepare("SELECT username , password FROM information");
if ($sql === false) {
    die("Error preparing the query: " . $conn->error);
}

// اجرای کوئری
$sql->execute();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // دریافت اطلاعات از فرم
    $username = $_POST['username'];
    $password = $_POST['password'];
}
// گرفتن نتایج
$result = $sql->get_result();
if ($result->num_rows > 0) {

}
// بررسی تعداد ردیف‌ها
if ($result->num_rows > 0) {
    // اگر داده‌ای پیدا شد، آن‌ها را نمایش می‌دهیم
    while ($row = $result->fetch_assoc()) {
        echo "Username: " . $row['username'] . " - password: " . $row['password'] . "<br>";
    }
} else {
    echo "No results found.";
}

// بستن اتصال
$sql->close();
$conn->close();
