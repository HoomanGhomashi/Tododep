<?php
// اتصال به پایگاه داده
$conn = new mysqli("localhost", "root", "", "users");

// بررسی خطا در اتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// دریافت اطلاعات از فرم
$username = $_POST['username'];
$password = $_POST['password'];
$verif_password = $_POST['verif_password'];
$email = $_POST['Email'];

// بررسی تطابق رمز عبور
if ($password !== $verif_password) {
    die("Passwords do not match!");
}

// رمزنگاری رمز عبور
$password_hashed = password_hash($password, PASSWORD_DEFAULT);

// ذخیره اطلاعات در جدول
$sql = "INSERT INTO information (username, password, email) VALUES ('$username', '$password_hashed', '$email')";

if ($conn->query($sql) === TRUE) {
    echo "Registration successful!";
   // echo "<a href='login.html'>Go to Login</a>";
    header("Location: login.html");
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
