<?php
// 1. Database connection settings
$servername = "localhost";
$username = "root"; // Default for XAMPP
$password = "";     // Default is empty
$database = "student_portal";

// 2. Connect to the database
$conn = new mysqli($servername, $username, $password, $database);

// 3. Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 4. Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$dob = $_POST['dob'];
$gender = $_POST['gender'];
$course = $_POST['course'];
$address = $_POST['address'];

// 5. Insert data into the database
$sql = "INSERT INTO registrations (name, email, phone, dob, gender, course, address)
        VALUES ('$name', '$email', '$phone', '$dob', '$gender', '$course', '$address')";

if ($conn->query($sql) === TRUE) {
    echo "Registration successful!";
} else {
    echo "Error: " . $conn->error;
}

// 6. Close connection
$conn->close();
?>
