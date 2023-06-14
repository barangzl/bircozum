<?php
    session_start();
    require_once "connect.php";

// Fetch advices from the database
$stmt = $con->prepare("SELECT * FROM advices");
$stmt->execute();
$result = $stmt->get_result();
$advices = [];
while ($row = $result->fetch_assoc()) {
    $advices[] = $row;
}

// Return advices as JSON response
header('Content-Type: application/json');
echo json_encode($advices);
?>