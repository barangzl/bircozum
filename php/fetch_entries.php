<?php
    session_start();
    require_once "connect.php";

// Fetch entries from the database
$stmt = $con->prepare("SELECT * FROM entries");
$stmt->execute();
$result = $stmt->get_result();
$entries = [];
while ($row = $result->fetch_assoc()) {
    $entries[] = $row;
}

// Return entries as JSON response
header('Content-Type: application/json');
echo json_encode($entries);
?>